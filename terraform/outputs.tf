output "vpc_id" {
  description = "VPC ID."
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs."
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs."
  value       = aws_subnet.private[*].id
}

output "public_nlb_dns_name" {
  description = "Internet-facing Network Load Balancer DNS name."
  value       = aws_lb.public_nlb.dns_name
}

output "application_url" {
  description = "HTTP application entry point through the public NLB and internal ALB."
  value       = "http://${aws_lb.public_nlb.dns_name}"
}

output "kubernetes_api_endpoint" {
  description = "Kubernetes API endpoint through the public NLB."
  value       = "https://${aws_lb.public_nlb.dns_name}:6443"
}

output "internal_alb_dns_name" {
  description = "Internal ALB DNS name."
  value       = aws_lb.internal_alb.dns_name
}

output "bastion_public_ips" {
  description = "Bastion host public IP addresses."
  value       = aws_instance.bastion[*].public_ip
}

output "control_plane_instance_ids" {
  description = "Control plane EC2 instance IDs."
  value       = aws_instance.control_plane[*].id
}

output "worker_asg_names" {
  description = "Worker Auto Scaling Group names."
  value       = aws_autoscaling_group.worker[*].name
}

output "kubeadm_join_ssm_parameters" {
  description = "SSM parameters used by nodes to join the Kubernetes cluster."
  value = {
    worker        = local.worker_join_parameter
    control_plane = local.control_plane_join_parameter
  }
}
