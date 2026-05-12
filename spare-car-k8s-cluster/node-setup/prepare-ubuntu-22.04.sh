#!/usr/bin/env bash
set -euxo pipefail

KUBERNETES_MINOR_VERSION="1.30"
KUBERNETES_VERSION="1.30.8-1.1"

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

apt-get update
apt-get install -y apt-transport-https ca-certificates curl gpg jq containerd

mkdir -p /etc/containerd
containerd config default >/etc/containerd/config.toml
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
systemctl restart containerd
systemctl enable containerd

mkdir -p /etc/apt/keyrings
curl -fsSL "https://pkgs.k8s.io/core:/stable:/v${KUBERNETES_MINOR_VERSION}/deb/Release.key" \
  | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v${KUBERNETES_MINOR_VERSION}/deb/ /" \
  >/etc/apt/sources.list.d/kubernetes.list

apt-get update
apt-get install -y kubelet="$KUBERNETES_VERSION" kubeadm="$KUBERNETES_VERSION" kubectl="$KUBERNETES_VERSION"
apt-mark hold kubelet kubeadm kubectl
systemctl enable kubelet
