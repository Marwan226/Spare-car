resource "aws_lb" "public_nlb" {
  name                             = "${local.name_prefix}-public-nlb"
  load_balancer_type               = "network"
  internal                         = false
  subnets                          = aws_subnet.public[*].id
  enable_cross_zone_load_balancing = true

  tags = {
    Name = "${local.name_prefix}-public-nlb"
  }
}

resource "aws_lb" "internal_alb" {
  name               = "${local.name_prefix}-internal-alb"
  load_balancer_type = "application"
  internal           = true
  subnets            = aws_subnet.private[*].id
  security_groups    = [aws_security_group.internal_alb.id]

  tags = {
    Name = "${local.name_prefix}-internal-alb"
  }
}

resource "aws_lb_target_group" "nlb_to_alb_http" {
  name        = "${local.name_prefix}-nlb-alb-80"
  port        = 80
  protocol    = "TCP"
  target_type = "alb"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled  = true
    protocol = "HTTP"
    path     = var.alb_health_check_path
    matcher  = "200-499"
  }
}

resource "aws_lb_target_group_attachment" "nlb_to_alb_http" {
  target_group_arn = aws_lb_target_group.nlb_to_alb_http.arn
  target_id        = aws_lb.internal_alb.arn
  port             = 80

  depends_on = [aws_lb_listener.internal_alb_http]
}

resource "aws_lb_listener" "public_http" {
  load_balancer_arn = aws_lb.public_nlb.arn
  port              = 80
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb_to_alb_http.arn
  }
}

resource "aws_lb_target_group" "nlb_to_alb_https" {
  count = var.acm_certificate_arn == null ? 0 : 1

  name        = "${local.name_prefix}-nlb-alb-443"
  port        = 443
  protocol    = "TCP"
  target_type = "alb"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled  = true
    protocol = "HTTPS"
    path     = var.alb_health_check_path
    matcher  = "200-499"
  }
}

resource "aws_lb_target_group_attachment" "nlb_to_alb_https" {
  count = var.acm_certificate_arn == null ? 0 : 1

  target_group_arn = aws_lb_target_group.nlb_to_alb_https[0].arn
  target_id        = aws_lb.internal_alb.arn
  port             = 443

  depends_on = [aws_lb_listener.internal_alb_https]
}

resource "aws_lb_listener" "public_https" {
  count = var.acm_certificate_arn == null ? 0 : 1

  load_balancer_arn = aws_lb.public_nlb.arn
  port              = 443
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb_to_alb_https[0].arn
  }
}

resource "aws_lb_target_group" "kubernetes_api" {
  name        = "${local.name_prefix}-k8s-api"
  port        = 6443
  protocol    = "TCP"
  target_type = "instance"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled  = true
    protocol = "TCP"
    port     = "traffic-port"
  }
}

resource "aws_lb_listener" "kubernetes_api" {
  load_balancer_arn = aws_lb.public_nlb.arn
  port              = 6443
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.kubernetes_api.arn
  }
}

resource "aws_lb_target_group" "bastion_ssh" {
  count = var.enable_ssh_nlb_listener ? 1 : 0

  name        = "${local.name_prefix}-bastion-ssh"
  port        = 22
  protocol    = "TCP"
  target_type = "instance"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled  = true
    protocol = "TCP"
    port     = "traffic-port"
  }
}

resource "aws_lb_listener" "bastion_ssh" {
  count = var.enable_ssh_nlb_listener ? 1 : 0

  load_balancer_arn = aws_lb.public_nlb.arn
  port              = 22
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.bastion_ssh[0].arn
  }
}

resource "aws_lb_target_group" "worker_ingress_http" {
  name        = "${local.name_prefix}-workers-http"
  port        = var.ingress_node_port
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled             = true
    protocol            = "HTTP"
    path                = var.alb_health_check_path
    matcher             = "200-499"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 5
  }

  tags = {
    Name = "${local.name_prefix}-workers-http"
  }
}

resource "aws_lb_listener" "internal_alb_http" {
  load_balancer_arn = aws_lb.internal_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.worker_ingress_http.arn
  }
}

resource "aws_lb_listener" "internal_alb_https" {
  count = var.acm_certificate_arn == null ? 0 : 1

  load_balancer_arn = aws_lb.internal_alb.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.acm_certificate_arn
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.worker_ingress_http.arn
  }
}
