# Self-Managed Kubernetes on AWS EC2

This Terraform project implements the architecture from the diagram:

- VPC `10.0.0.0/16`
- Two Availability Zones
- Public subnets `10.0.1.0/24` and `10.0.2.0/24`
- Private subnets `10.0.11.0/24` and `10.0.12.0/24`
- Internet Gateway
- NAT Gateway per AZ for private subnet egress
- Bastion host per public subnet
- Internet-facing Network Load Balancer
- Internal Application Load Balancer
- Two self-managed Kubernetes control plane EC2 instances
- Worker Auto Scaling Group per AZ
- IAM roles, SSM access, CloudWatch agent policy, security groups, route tables, and bootstrap scripts

## How traffic flows

Application traffic:

`Internet -> public NLB port 80/443 -> internal ALB -> worker node NodePort -> ingress-nginx -> Kubernetes services`

Administrative traffic:

`Admin IP -> public NLB port 6443 -> Kubernetes API on private control plane nodes`

SSH, when enabled:

`Admin IP -> public NLB port 22 -> bastion hosts -> private node IPs`

Private subnet egress:

`Private subnet -> same-AZ NAT Gateway -> Internet Gateway -> Internet`

## Before you apply

1. Configure AWS credentials locally.
2. Copy the example variables file:

   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit `terraform.tfvars` and replace `YOUR_PUBLIC_IP/32` with your real public IP CIDR.
4. Set `key_name` if you want SSH. You can also use SSM Session Manager because the instances have the SSM managed policy.

## Deploy

```bash
terraform init
terraform plan
terraform apply
```

The first control plane initializes the cluster with `kubeadm`, installs Calico, creates the `app-ns`, `data-ns`, and `monitoring` namespaces, installs ingress-nginx, and stores join commands in AWS SSM Parameter Store. Secondary control plane and worker nodes wait for those SSM parameters and join automatically.

## Important notes

- This is a real self-managed Kubernetes build, not EKS managed control plane.
- The public NLB exposes the Kubernetes API on port `6443`. Keep `admin_cidrs` restricted to your IP.
- The internal ALB sends traffic to worker nodes on `ingress_node_port`, default `32080`.
- NAT Gateways, NLB, ALB, EC2, and EBS volumes create AWS cost.
- For production, add backups for etcd, managed DNS, ACM certificates, log retention, cluster upgrades, and stronger node hardening.

## Useful outputs

After apply, Terraform prints:

- `application_url`
- `kubernetes_api_endpoint`
- `public_nlb_dns_name`
- `bastion_public_ips`
- `control_plane_instance_ids`
- `worker_asg_names`

To inspect the cluster, start an SSM session or SSH to a control plane node and use:

```bash
sudo kubectl --kubeconfig=/etc/kubernetes/admin.conf get nodes -o wide
sudo kubectl --kubeconfig=/etc/kubernetes/admin.conf get pods -A
```
