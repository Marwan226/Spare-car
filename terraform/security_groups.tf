resource "aws_security_group" "bastion" {
  name        = "${local.name_prefix}-bastion-sg"
  description = "Bastion host access"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${local.name_prefix}-bastion-sg"
  }
}

resource "aws_security_group" "control_plane" {
  name        = "${local.name_prefix}-control-plane-sg"
  description = "Kubernetes control plane nodes"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${local.name_prefix}-control-plane-sg"
  }
}

resource "aws_security_group" "worker" {
  name        = "${local.name_prefix}-worker-sg"
  description = "Kubernetes worker nodes"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${local.name_prefix}-worker-sg"
  }
}

resource "aws_security_group" "internal_alb" {
  name        = "${local.name_prefix}-internal-alb-sg"
  description = "Internal application load balancer"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${local.name_prefix}-internal-alb-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "bastion_ssh_admin" {
  for_each = toset(var.admin_cidrs)

  security_group_id = aws_security_group.bastion.id
  cidr_ipv4         = each.value
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
  description       = "SSH from admin CIDR"
}

resource "aws_vpc_security_group_ingress_rule" "bastion_ssh_from_public_subnets" {
  for_each = toset(var.public_subnet_cidrs)

  security_group_id = aws_security_group.bastion.id
  cidr_ipv4         = each.value
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
  description       = "SSH health checks and forwarding from public NLB subnets"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_api_admin" {
  for_each = toset(var.admin_cidrs)

  security_group_id = aws_security_group.control_plane.id
  cidr_ipv4         = each.value
  from_port         = 6443
  ip_protocol       = "tcp"
  to_port           = 6443
  description       = "Kubernetes API from admin CIDR through NLB"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_api_vpc" {
  security_group_id = aws_security_group.control_plane.id
  cidr_ipv4         = var.vpc_cidr
  from_port         = 6443
  ip_protocol       = "tcp"
  to_port           = 6443
  description       = "Kubernetes API from VPC"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_ssh_from_bastion" {
  security_group_id            = aws_security_group.control_plane.id
  referenced_security_group_id = aws_security_group.bastion.id
  from_port                    = 22
  ip_protocol                  = "tcp"
  to_port                      = 22
  description                  = "SSH from bastions"
}

resource "aws_vpc_security_group_ingress_rule" "worker_ssh_from_bastion" {
  security_group_id            = aws_security_group.worker.id
  referenced_security_group_id = aws_security_group.bastion.id
  from_port                    = 22
  ip_protocol                  = "tcp"
  to_port                      = 22
  description                  = "SSH from bastions"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_etcd_self" {
  security_group_id            = aws_security_group.control_plane.id
  referenced_security_group_id = aws_security_group.control_plane.id
  from_port                    = 2379
  ip_protocol                  = "tcp"
  to_port                      = 2380
  description                  = "etcd peer and client traffic"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_kubelet_from_worker" {
  security_group_id            = aws_security_group.control_plane.id
  referenced_security_group_id = aws_security_group.worker.id
  from_port                    = 10250
  ip_protocol                  = "tcp"
  to_port                      = 10250
  description                  = "Kubelet API from workers"
}

resource "aws_vpc_security_group_ingress_rule" "worker_kubelet_from_control_plane" {
  security_group_id            = aws_security_group.worker.id
  referenced_security_group_id = aws_security_group.control_plane.id
  from_port                    = 10250
  ip_protocol                  = "tcp"
  to_port                      = 10250
  description                  = "Kubelet API from control plane"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_scheduler_self" {
  security_group_id            = aws_security_group.control_plane.id
  referenced_security_group_id = aws_security_group.control_plane.id
  from_port                    = 10257
  ip_protocol                  = "tcp"
  to_port                      = 10259
  description                  = "Controller manager and scheduler"
}

resource "aws_vpc_security_group_ingress_rule" "control_plane_overlay_from_nodes" {
  security_group_id            = aws_security_group.control_plane.id
  referenced_security_group_id = aws_security_group.worker.id
  ip_protocol                  = "-1"
  description                  = "Pod overlay and node traffic from workers"
}

resource "aws_vpc_security_group_ingress_rule" "worker_overlay_from_control_plane" {
  security_group_id            = aws_security_group.worker.id
  referenced_security_group_id = aws_security_group.control_plane.id
  ip_protocol                  = "-1"
  description                  = "Pod overlay and node traffic from control plane"
}

resource "aws_vpc_security_group_ingress_rule" "worker_overlay_self" {
  security_group_id            = aws_security_group.worker.id
  referenced_security_group_id = aws_security_group.worker.id
  ip_protocol                  = "-1"
  description                  = "Pod overlay and node traffic between workers"
}

resource "aws_vpc_security_group_ingress_rule" "internal_alb_http" {
  for_each = toset(var.app_ingress_cidrs)

  security_group_id = aws_security_group.internal_alb.id
  cidr_ipv4         = each.value
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
  description       = "HTTP from public NLB clients"
}

resource "aws_vpc_security_group_ingress_rule" "internal_alb_http_from_public_subnets" {
  for_each = toset(var.public_subnet_cidrs)

  security_group_id = aws_security_group.internal_alb.id
  cidr_ipv4         = each.value
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
  description       = "HTTP health checks and forwarding from public NLB subnets"
}

resource "aws_vpc_security_group_ingress_rule" "internal_alb_https" {
  for_each = toset(var.acm_certificate_arn == null ? [] : var.app_ingress_cidrs)

  security_group_id = aws_security_group.internal_alb.id
  cidr_ipv4         = each.value
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
  description       = "HTTPS from public NLB clients"
}

resource "aws_vpc_security_group_ingress_rule" "internal_alb_https_from_public_subnets" {
  for_each = toset(var.acm_certificate_arn == null ? [] : var.public_subnet_cidrs)

  security_group_id = aws_security_group.internal_alb.id
  cidr_ipv4         = each.value
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
  description       = "HTTPS health checks and forwarding from public NLB subnets"
}

resource "aws_vpc_security_group_ingress_rule" "worker_ingress_nodeport_from_alb" {
  security_group_id            = aws_security_group.worker.id
  referenced_security_group_id = aws_security_group.internal_alb.id
  from_port                    = var.ingress_node_port
  ip_protocol                  = "tcp"
  to_port                      = var.ingress_node_port
  description                  = "Ingress controller NodePort from internal ALB"
}

resource "aws_vpc_security_group_egress_rule" "bastion_all" {
  security_group_id = aws_security_group.bastion.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "control_plane_all" {
  security_group_id = aws_security_group.control_plane.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "worker_all" {
  security_group_id = aws_security_group.worker.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "internal_alb_all" {
  security_group_id = aws_security_group.internal_alb.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
