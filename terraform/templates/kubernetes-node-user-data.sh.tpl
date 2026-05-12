#!/usr/bin/env bash
set -euxo pipefail

exec > >(tee /var/log/kubernetes-bootstrap.log | logger -t kubernetes-bootstrap -s 2>/dev/console) 2>&1

AWS_REGION="${aws_region}"
NODE_NAME="${node_name}"
NODE_ROLE="${node_role}"
IS_PRIMARY_CONTROL_PLANE="${is_primary_control_plane}"
CLUSTER_NAME="${cluster_name}"
KUBERNETES_VERSION="${kubernetes_version}"
KUBERNETES_MINOR_VERSION="${kubernetes_minor_version}"
KUBEADM_TOKEN="${kubeadm_token}"
POD_CIDR="${pod_cidr}"
SERVICE_CIDR="${service_cidr}"
CALICO_VERSION="${calico_version}"
INGRESS_NGINX_VERSION="${ingress_nginx_version}"
INGRESS_NODE_PORT="${ingress_node_port}"
API_ENDPOINT="${api_endpoint}"
WORKER_JOIN_PARAMETER="${worker_join_parameter}"
CONTROL_PLANE_JOIN_PARAMETER="${control_plane_join_parameter}"
INSTALL_INGRESS_NGINX="${install_ingress_nginx}"

apt-get update -y
apt-get install -y ca-certificates curl

IMDS_TOKEN="$(curl -fsS -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")"
LOCAL_IP="$(curl -fsS -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" http://169.254.169.254/latest/meta-data/local-ipv4)"
INSTANCE_ID="$(curl -fsS -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" http://169.254.169.254/latest/meta-data/instance-id)"

if [ "$NODE_ROLE" = "worker" ]; then
  FINAL_NODE_NAME="$NODE_NAME-$INSTANCE_ID"
else
  FINAL_NODE_NAME="$NODE_NAME"
fi

hostnamectl set-hostname "$FINAL_NODE_NAME"

install_base_packages() {
  apt-get update -y
  apt-get install -y apt-transport-https ca-certificates curl gpg jq unzip awscli conntrack socat ebtables ethtool

  snap install amazon-ssm-agent --classic || true
  systemctl enable --now snap.amazon-ssm-agent.amazon-ssm-agent.service || true
}

configure_kernel() {
  swapoff -a
  sed -i '/ swap / s/^/#/' /etc/fstab

  cat >/etc/modules-load.d/k8s.conf <<'EOF_MODULES'
overlay
br_netfilter
EOF_MODULES

  modprobe overlay
  modprobe br_netfilter

  cat >/etc/sysctl.d/k8s.conf <<'EOF_SYSCTL'
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF_SYSCTL

  sysctl --system
}

install_containerd() {
  apt-get install -y containerd
  mkdir -p /etc/containerd
  containerd config default >/etc/containerd/config.toml
  sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
  systemctl enable --now containerd
  systemctl restart containerd
}

install_kubernetes() {
  mkdir -p /etc/apt/keyrings
  curl -fsSL "https://pkgs.k8s.io/core:/stable:/v$KUBERNETES_MINOR_VERSION/deb/Release.key" \
    | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
  echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v$KUBERNETES_MINOR_VERSION/deb/ /" \
    >/etc/apt/sources.list.d/kubernetes.list

  apt-get update -y
  apt-get install -y \
    kubelet="$KUBERNETES_VERSION-1.1" \
    kubeadm="$KUBERNETES_VERSION-1.1" \
    kubectl="$KUBERNETES_VERSION-1.1" || apt-get install -y kubelet kubeadm kubectl
  apt-mark hold kubelet kubeadm kubectl

  systemctl enable kubelet
}

install_cloudwatch_agent_best_effort() {
  tmp_deb="/tmp/amazon-cloudwatch-agent.deb"
  url="https://s3.$AWS_REGION.amazonaws.com/amazoncloudwatch-agent-$AWS_REGION/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb"
  curl -fsSL "$url" -o "$tmp_deb" && dpkg -i "$tmp_deb" || true

  if [ -x /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl ]; then
    mkdir -p /opt/aws/amazon-cloudwatch-agent/etc
    cat >/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json <<EOF_CW
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/kubernetes-bootstrap.log",
            "log_group_name": "/aws/ec2/$CLUSTER_NAME/bootstrap",
            "log_stream_name": "{instance_id}/$NODE_ROLE"
          },
          {
            "file_path": "/var/log/syslog",
            "log_group_name": "/aws/ec2/$CLUSTER_NAME/syslog",
            "log_stream_name": "{instance_id}/$NODE_ROLE"
          }
        ]
      }
    }
  }
}
EOF_CW
    /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
      -a fetch-config \
      -m ec2 \
      -s \
      -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json || true
  fi
}

put_secure_parameter() {
  local name="$1"
  local value="$2"
  aws ssm put-parameter \
    --region "$AWS_REGION" \
    --name "$name" \
    --type SecureString \
    --value "$value" \
    --overwrite >/dev/null
}

get_secure_parameter_with_wait() {
  local name="$1"
  local value=""

  for _ in $(seq 1 180); do
    if value="$(aws ssm get-parameter --region "$AWS_REGION" --name "$name" --with-decryption --query 'Parameter.Value' --output text 2>/dev/null)"; then
      echo "$value"
      return 0
    fi
    sleep 20
  done

  echo "Timed out waiting for SSM parameter $name" >&2
  return 1
}

init_primary_control_plane() {
  if [ -f /etc/kubernetes/admin.conf ]; then
    return 0
  fi

  cat >/root/kubeadm-config.yaml <<EOF_KUBEADM
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: v$KUBERNETES_VERSION
clusterName: $CLUSTER_NAME
controlPlaneEndpoint: "$API_ENDPOINT:6443"
networking:
  podSubnet: "$POD_CIDR"
  serviceSubnet: "$SERVICE_CIDR"
apiServer:
  certSANs:
  - "$API_ENDPOINT"
  - "$LOCAL_IP"
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
bootstrapTokens:
- token: "$KUBEADM_TOKEN"
  ttl: "0"
localAPIEndpoint:
  advertiseAddress: "$LOCAL_IP"
  bindPort: 6443
nodeRegistration:
  name: "$FINAL_NODE_NAME"
  criSocket: unix:///run/containerd/containerd.sock
EOF_KUBEADM

  kubeadm init --config /root/kubeadm-config.yaml --upload-certs

  mkdir -p /root/.kube
  cp /etc/kubernetes/admin.conf /root/.kube/config

  kubectl --kubeconfig=/etc/kubernetes/admin.conf apply \
    -f "https://raw.githubusercontent.com/projectcalico/calico/v$CALICO_VERSION/manifests/calico.yaml"

  kubectl --kubeconfig=/etc/kubernetes/admin.conf create namespace app-ns --dry-run=client -o yaml | kubectl --kubeconfig=/etc/kubernetes/admin.conf apply -f -
  kubectl --kubeconfig=/etc/kubernetes/admin.conf create namespace data-ns --dry-run=client -o yaml | kubectl --kubeconfig=/etc/kubernetes/admin.conf apply -f -
  kubectl --kubeconfig=/etc/kubernetes/admin.conf create namespace monitoring --dry-run=client -o yaml | kubectl --kubeconfig=/etc/kubernetes/admin.conf apply -f -

  if [ "$INSTALL_INGRESS_NGINX" = "true" ]; then
    kubectl --kubeconfig=/etc/kubernetes/admin.conf apply \
      -f "https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v$INGRESS_NGINX_VERSION/deploy/static/provider/baremetal/deploy.yaml"
    kubectl --kubeconfig=/etc/kubernetes/admin.conf -n ingress-nginx patch service ingress-nginx-controller \
      --type merge \
      -p "{\"spec\":{\"type\":\"NodePort\",\"ports\":[{\"name\":\"http\",\"port\":80,\"targetPort\":\"http\",\"protocol\":\"TCP\",\"nodePort\":$INGRESS_NODE_PORT}]}}"
  fi

  JOIN_CMD="$(kubeadm token create --ttl 0 --print-join-command)"
  CERT_KEY="$(kubeadm init phase upload-certs --upload-certs | tail -n 1)"

  put_secure_parameter "$WORKER_JOIN_PARAMETER" "$JOIN_CMD --cri-socket unix:///run/containerd/containerd.sock"
  put_secure_parameter "$CONTROL_PLANE_JOIN_PARAMETER" "$JOIN_CMD --control-plane --certificate-key $CERT_KEY --cri-socket unix:///run/containerd/containerd.sock"
}

join_secondary_control_plane() {
  if [ -f /etc/kubernetes/kubelet.conf ]; then
    return 0
  fi

  JOIN_CMD="$(get_secure_parameter_with_wait "$CONTROL_PLANE_JOIN_PARAMETER")"

  for _ in $(seq 1 30); do
    if $JOIN_CMD --apiserver-advertise-address "$LOCAL_IP"; then
      return 0
    fi
    sleep 20
  done

  echo "Secondary control plane failed to join after retries" >&2
  return 1
}

join_worker() {
  if [ -f /etc/kubernetes/kubelet.conf ]; then
    return 0
  fi

  JOIN_CMD="$(get_secure_parameter_with_wait "$WORKER_JOIN_PARAMETER")"

  for _ in $(seq 1 30); do
    if $JOIN_CMD; then
      return 0
    fi
    sleep 20
  done

  echo "Worker failed to join after retries" >&2
  return 1
}

install_base_packages
configure_kernel
install_containerd
install_kubernetes
install_cloudwatch_agent_best_effort

case "$NODE_ROLE" in
  control-plane)
    if [ "$IS_PRIMARY_CONTROL_PLANE" = "true" ]; then
      init_primary_control_plane
    else
      join_secondary_control_plane
    fi
    ;;
  worker)
    join_worker
    ;;
  *)
    echo "Unknown NODE_ROLE=$NODE_ROLE" >&2
    exit 1
    ;;
esac
