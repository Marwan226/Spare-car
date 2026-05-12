variable "project_name" {
  description = "Short project name used in resource names and tags."
  type        = string
  default     = "graduation-k8s"
}

variable "environment" {
  description = "Environment name used in resource names and tags."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "az_count" {
  description = "Number of availability zones to use. This architecture expects 2."
  type        = number
  default     = 2

  validation {
    condition     = var.az_count == 2
    error_message = "The diagram uses exactly two availability zones. Keep az_count set to 2 unless you also update the subnet CIDR lists."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks, one per AZ."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks, one per AZ."
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "admin_cidrs" {
  description = "CIDR blocks allowed to reach SSH and the Kubernetes API through the public NLB. Use your public IP as x.x.x.x/32."
  type        = list(string)
  default     = []
}

variable "app_ingress_cidrs" {
  description = "CIDR blocks allowed to reach application traffic on the internet-facing NLB."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "key_name" {
  description = "Optional EC2 key pair name for SSH. Leave null if you only use SSM Session Manager."
  type        = string
  default     = null
}

variable "ami_id" {
  description = "Optional custom Ubuntu AMI ID. When null, the latest Ubuntu 22.04 LTS amd64 AMI is used."
  type        = string
  default     = null
}

variable "bastion_instance_type" {
  description = "EC2 instance type for bastion hosts."
  type        = string
  default     = "t3.micro"
}

variable "control_plane_instance_type" {
  description = "EC2 instance type for Kubernetes control plane nodes."
  type        = string
  default     = "t3.medium"
}

variable "worker_instance_type" {
  description = "EC2 instance type for Kubernetes worker nodes."
  type        = string
  default     = "t3.medium"
}

variable "worker_min_size" {
  description = "Minimum workers per AZ."
  type        = number
  default     = 1
}

variable "worker_desired_size" {
  description = "Desired workers per AZ."
  type        = number
  default     = 2
}

variable "worker_max_size" {
  description = "Maximum workers per AZ."
  type        = number
  default     = 4
}

variable "root_volume_size_gb" {
  description = "Root EBS volume size for all instances."
  type        = number
  default     = 40
}

variable "kubernetes_version" {
  description = "Kubernetes version for kubeadm."
  type        = string
  default     = "1.30.8"
}

variable "kubernetes_minor_version" {
  description = "Kubernetes package repository minor version."
  type        = string
  default     = "1.30"
}

variable "pod_cidr" {
  description = "Pod network CIDR used by Calico."
  type        = string
  default     = "192.168.0.0/16"
}

variable "service_cidr" {
  description = "Kubernetes service CIDR."
  type        = string
  default     = "172.20.0.0/16"
}

variable "calico_version" {
  description = "Calico manifest version to install on the primary control plane."
  type        = string
  default     = "3.28.2"
}

variable "ingress_nginx_version" {
  description = "ingress-nginx controller version installed by kubeadm bootstrap."
  type        = string
  default     = "1.11.3"
}

variable "ingress_node_port" {
  description = "NodePort where the internal ALB sends HTTP traffic to worker nodes."
  type        = number
  default     = 32080

  validation {
    condition     = var.ingress_node_port >= 30000 && var.ingress_node_port <= 32767
    error_message = "ingress_node_port must be in the Kubernetes NodePort range 30000-32767."
  }
}

variable "alb_health_check_path" {
  description = "Health check path used by the internal ALB against ingress-nginx on worker nodes."
  type        = string
  default     = "/"
}

variable "acm_certificate_arn" {
  description = "Optional ACM certificate ARN. When set, HTTPS listeners are added on the internal ALB and public NLB."
  type        = string
  default     = null
}

variable "enable_ssh_nlb_listener" {
  description = "Create a public TCP/22 NLB listener to bastions."
  type        = bool
  default     = true
}
