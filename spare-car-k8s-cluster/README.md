# spare-car-k8s-cluster

Declarative kubeadm files for the `spare-car-k8s-cluster` self-managed Kubernetes cluster on AWS.

## Cluster Design

| Item | Value |
| --- | --- |
| Environment | `dev` |
| AWS region | `us-east-1` |
| Kubernetes | `v1.30.8` |
| Runtime | `containerd` |
| CNI | Calico |
| Pod CIDR | `192.168.0.0/16` |
| Service CIDR | `172.20.0.0/16` |
| API endpoint | `my-k8s-api-nlb-123456.us-east-1.elb.amazonaws.com:6443` |
| Control plane A | `control-plane-a`, `10.0.11.10`, `us-east-1a` |
| Control plane B | `control-plane-b`, `10.0.12.10`, `us-east-1b` |
| Worker A | `worker-a-1`, `10.0.11.20`, `us-east-1a` |
| Worker B | `worker-b-1`, `10.0.12.20`, `us-east-1b` |
| HTTP ingress NodePort | `32080` |
| HTTPS ingress NodePort | `32443` |
| CloudWatch | Enabled through Fluent Bit |
| Metrics Server | Enabled |
| Kubernetes Dashboard | Disabled |

## Files

```text
kubeadm/00-control-plane-a-init.yaml
kubeadm/01-control-plane-b-join.yaml
kubeadm/02-worker-a-1-join.yaml
kubeadm/03-worker-b-1-join.yaml
manifests/00-namespaces.yaml
manifests/10-metrics-server.yaml
manifests/20-ingress-nginx-service-nodeport.yaml
manifests/30-cloudwatch-fluent-bit.yaml
node-setup/prepare-ubuntu-22.04.sh
```

## Values You Still Must Replace

These cannot be known until your real AWS resources and first kubeadm init exist:

```text
REPLACE_WITH_BOOTSTRAP_TOKEN
REPLACE_WITH_CA_CERT_HASH
REPLACE_WITH_CERTIFICATE_KEY
```

Also confirm this is your real NLB DNS name. Right now it looks like an example:

```text
my-k8s-api-nlb-123456.us-east-1.elb.amazonaws.com
```

Your admin CIDR is not used inside kubeadm YAML. Put your real public IP in AWS security groups instead of:

```text
156.xxx.xxx.xxx/32
```

The Kubernetes API security group should allow port `6443` only from your real admin `/32`, plus the VPC/private node traffic that the cluster needs.

## Step 1: Prepare AWS First

Before running kubeadm, make sure AWS has:

- VPC `10.0.0.0/16`
- Private subnets containing `10.0.11.10`, `10.0.12.10`, `10.0.11.20`, `10.0.12.20`
- EC2 instances with those private IPs
- Public NLB forwarding TCP `6443` to both control-plane nodes
- Internal ALB forwarding HTTP to worker NodePort `32080`
- NAT gateway egress from private subnets
- Security groups allowing node-to-node Kubernetes traffic
- EC2 IAM permissions for CloudWatch Logs if you apply the CloudWatch manifest

For CloudWatch Fluent Bit, each worker/control-plane instance role needs permissions like:

```text
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
logs:DescribeLogStreams
```

AWS managed policy `CloudWatchAgentServerPolicy` is enough for a simple project setup.

## Step 2: Generate A Bootstrap Token

On any machine with kubeadm installed, run:

```bash
kubeadm token generate
```

Replace `REPLACE_WITH_BOOTSTRAP_TOKEN` in all kubeadm files with that token.

Token format looks like:

```text
abcdef.0123456789abcdef
```

## Step 3: Prepare Every Node

Copy and run this script on every EC2 node:

```bash
sudo bash node-setup/prepare-ubuntu-22.04.sh
```

Run it on:

- `control-plane-a`
- `control-plane-b`
- `worker-a-1`
- `worker-b-1`

## Step 4: Initialize control-plane-a

Copy this file to `control-plane-a`:

```text
kubeadm/00-control-plane-a-init.yaml
```

Run:

```bash
sudo kubeadm init --config kubeadm/00-control-plane-a-init.yaml --upload-certs
```

Configure kubectl:

```bash
mkdir -p "$HOME/.kube"
sudo cp /etc/kubernetes/admin.conf "$HOME/.kube/config"
sudo chown "$(id -u):$(id -g)" "$HOME/.kube/config"
```

## Step 5: Get Join Values

Get the CA certificate hash on `control-plane-a`:

```bash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt \
  | openssl rsa -pubin -outform der 2>/dev/null \
  | openssl dgst -sha256 -hex \
  | sed 's/^.* //'
```

Replace `REPLACE_WITH_CA_CERT_HASH` in:

```text
kubeadm/01-control-plane-b-join.yaml
kubeadm/02-worker-a-1-join.yaml
kubeadm/03-worker-b-1-join.yaml
```

Get the certificate key for joining another control plane:

```bash
sudo kubeadm init phase upload-certs --upload-certs
```

Use the final output line to replace `REPLACE_WITH_CERTIFICATE_KEY` in:

```text
kubeadm/01-control-plane-b-join.yaml
```

## Step 6: Install Calico

Run from `control-plane-a`:

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.2/manifests/calico.yaml
```

Wait for the first node to become ready:

```bash
kubectl get nodes -o wide
kubectl get pods -A
```

## Step 7: Join control-plane-b

Copy this file to `control-plane-b` after replacing the placeholders:

```text
kubeadm/01-control-plane-b-join.yaml
```

Run:

```bash
sudo kubeadm join --config kubeadm/01-control-plane-b-join.yaml
```

## Step 8: Join Workers

On `worker-a-1`, run:

```bash
sudo kubeadm join --config kubeadm/02-worker-a-1-join.yaml
```

On `worker-b-1`, run:

```bash
sudo kubeadm join --config kubeadm/03-worker-b-1-join.yaml
```

## Step 9: Apply Cluster Manifests

From `control-plane-a`:

```bash
kubectl apply -f manifests/00-namespaces.yaml
kubectl apply -f manifests/10-metrics-server.yaml
```

Install ingress-nginx controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.3/deploy/static/provider/baremetal/deploy.yaml
```

Then force the service to your NodePorts:

```bash
kubectl apply -f manifests/20-ingress-nginx-service-nodeport.yaml
```

Apply CloudWatch logging:

```bash
kubectl apply -f manifests/30-cloudwatch-fluent-bit.yaml
```

## Step 10: Check Everything

```bash
kubectl get nodes -o wide
kubectl get namespaces
kubectl get pods -A
kubectl top nodes
kubectl top pods -A
kubectl -n ingress-nginx get svc
kubectl -n amazon-cloudwatch get pods
```

Expected nodes:

```text
control-plane-a
control-plane-b
worker-a-1
worker-b-1
```

## Important Notes

- Do not use `156.xxx.xxx.xxx/32` in AWS. Replace it with your real public IP.
- Do not expose API port `6443` to `0.0.0.0/0`.
- `my-k8s-api-nlb-123456.us-east-1.elb.amazonaws.com` must be the real DNS name of your NLB.
- This is a self-managed kubeadm cluster, not Amazon EKS.
- Because this is `dev`, two control planes are acceptable for your project diagram. For stronger production HA, use three control-plane nodes.
