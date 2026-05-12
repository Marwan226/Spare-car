# Declarative kubeadm Cluster Files

These files describe only the Kubernetes cluster layer from the architecture:

- Two control-plane nodes
- Worker nodes
- High-availability API endpoint behind the public NLB
- Pod CIDR `192.168.0.0/16`
- Service CIDR `172.20.0.0/16`
- Namespaces: `app-ns`, `data-ns`, `monitoring`
- ingress-nginx exposed by NodePort `32080` so the internal ALB can forward traffic to workers

Terraform or manual AWS work is still needed for the VPC, subnets, NAT gateways, EC2 instances, security groups, NLB, and ALB.

## Files

| File | Use |
| --- | --- |
| `00-primary-control-plane-init.yaml` | Run once on the first control-plane node. |
| `01-secondary-control-plane-join.yaml` | Run once on the second control-plane node. |
| `02-worker-join.yaml` | Run on every worker node after changing the node name. |
| `03-namespaces.yaml` | Apply after the cluster is ready. |
| `04-ingress-nginx-nodeport-service.yaml` | Apply after installing ingress-nginx. |

## What You Must Change

Before running anything, replace these placeholders:

```text
REPLACE_WITH_NLB_DNS_NAME
REPLACE_WITH_CA_CERT_HASH
REPLACE_WITH_CERTIFICATE_KEY
REPLACE_WITH_WORKER_NODE_NAME
```

Also update these private IPs if your EC2 nodes use different addresses:

```text
10.0.11.10
10.0.12.10
```

The token in the files is an example:

```text
abcdef.0123456789abcdef
```

For a real cluster, create your own token:

```bash
kubeadm token generate
```

Then put the generated token in all three kubeadm YAML files.

## Prepare Every Node

Run these steps on every control-plane and worker EC2 instance before using the YAML files.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg containerd

sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml >/dev/null
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd
```

Install Kubernetes packages:

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key \
  | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' \
  | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
sudo apt-get install -y kubelet=1.30.8-1.1 kubeadm=1.30.8-1.1 kubectl=1.30.8-1.1
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable kubelet
```

## Step 1: Initialize First Control Plane

Copy `00-primary-control-plane-init.yaml` to the first control-plane node.

Run:

```bash
sudo kubeadm init --config 00-primary-control-plane-init.yaml --upload-certs
```

Configure kubectl on the first control-plane node:

```bash
mkdir -p "$HOME/.kube"
sudo cp /etc/kubernetes/admin.conf "$HOME/.kube/config"
sudo chown "$(id -u):$(id -g)" "$HOME/.kube/config"
```

## Step 2: Get Required Join Values

Get the CA certificate hash:

```bash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt \
  | openssl rsa -pubin -outform der 2>/dev/null \
  | openssl dgst -sha256 -hex \
  | sed 's/^.* //'
```

Put the result in:

```text
REPLACE_WITH_CA_CERT_HASH
```

Get the certificate key for adding another control-plane node:

```bash
sudo kubeadm init phase upload-certs --upload-certs
```

Use the final line of output as:

```text
REPLACE_WITH_CERTIFICATE_KEY
```

## Step 3: Install Pod Networking

Install Calico from the first control-plane node:

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.2/manifests/calico.yaml
```

Wait until the first control-plane node becomes ready:

```bash
kubectl get nodes -o wide
```

## Step 4: Join Second Control Plane

Copy `01-secondary-control-plane-join.yaml` to the second control-plane node after replacing the placeholders.

Run:

```bash
sudo kubeadm join --config 01-secondary-control-plane-join.yaml
```

## Step 5: Join Workers

For each worker, copy `02-worker-join.yaml`, change:

```text
REPLACE_WITH_WORKER_NODE_NAME
```

Examples:

```text
worker-a-1
worker-a-2
worker-b-1
worker-b-2
```

Then run on each worker:

```bash
sudo kubeadm join --config 02-worker-join.yaml
```

## Step 6: Create Namespaces

Run from a machine with kubectl access:

```bash
kubectl apply -f 03-namespaces.yaml
```

## Step 7: Install ingress-nginx

Install ingress-nginx:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.3/deploy/static/provider/baremetal/deploy.yaml
```

Then apply the NodePort service file:

```bash
kubectl apply -f 04-ingress-nginx-nodeport-service.yaml
```

Your internal ALB should forward HTTP traffic to worker nodes on:

```text
32080
```

## Check The Cluster

```bash
kubectl get nodes -o wide
kubectl get pods -A
kubectl get namespaces
kubectl -n ingress-nginx get svc
```

## Important

Do not expose port `6443` to the whole internet. The NLB listener for Kubernetes API should allow only your admin public IP.

For a real production cluster, add:

- etcd backups
- log retention
- CloudWatch or another monitoring stack
- private DNS name for the API endpoint
- certificate rotation process
- patching and upgrade plan
