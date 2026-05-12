locals {
  selected_ami_id = var.ami_id == null ? data.aws_ami.ubuntu.id : var.ami_id
  kubeadm_token   = "${random_id.kubeadm_token_id.hex}.${random_id.kubeadm_token_secret.hex}"
}

resource "aws_instance" "bastion" {
  count = var.az_count

  ami                         = local.selected_ami_id
  instance_type               = var.bastion_instance_type
  subnet_id                   = aws_subnet.public[count.index].id
  vpc_security_group_ids      = [aws_security_group.bastion.id]
  associate_public_ip_address = true
  key_name                    = var.key_name
  iam_instance_profile        = aws_iam_instance_profile.node.name
  user_data                   = templatefile("${path.module}/templates/bastion-user-data.sh.tpl", {
    node_name = "${local.name_prefix}-bastion-${count.index + 1}"
  })

  root_block_device {
    volume_size = var.root_volume_size_gb
    volume_type = "gp3"
    encrypted   = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  tags = {
    Name = "${local.name_prefix}-bastion-${count.index + 1}"
    Role = "bastion"
  }
}

resource "aws_instance" "control_plane" {
  count = var.az_count

  ami                    = local.selected_ami_id
  instance_type          = var.control_plane_instance_type
  subnet_id              = aws_subnet.private[count.index].id
  vpc_security_group_ids = [aws_security_group.control_plane.id]
  key_name               = var.key_name
  iam_instance_profile   = aws_iam_instance_profile.node.name
  user_data_replace_on_change = true
  user_data = templatefile("${path.module}/templates/kubernetes-node-user-data.sh.tpl", {
    aws_region                   = var.aws_region
    node_name                    = "${local.name_prefix}-cp-${count.index + 1}"
    node_role                    = "control-plane"
    is_primary_control_plane     = count.index == 0 ? "true" : "false"
    cluster_name                 = local.cluster_name
    kubernetes_version           = var.kubernetes_version
    kubernetes_minor_version     = var.kubernetes_minor_version
    kubeadm_token                = local.kubeadm_token
    pod_cidr                     = var.pod_cidr
    service_cidr                 = var.service_cidr
    calico_version               = var.calico_version
    ingress_nginx_version        = var.ingress_nginx_version
    ingress_node_port            = var.ingress_node_port
    api_endpoint                 = aws_lb.public_nlb.dns_name
    worker_join_parameter        = local.worker_join_parameter
    control_plane_join_parameter = local.control_plane_join_parameter
    install_ingress_nginx        = "true"
  })

  root_block_device {
    volume_size = var.root_volume_size_gb
    volume_type = "gp3"
    encrypted   = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  tags = {
    Name                                      = "${local.name_prefix}-cp-${count.index + 1}"
    Role                                      = "control-plane"
    "kubernetes.io/cluster/${local.cluster_name}" = "owned"
  }
}

resource "aws_lb_target_group_attachment" "kubernetes_api" {
  count = var.az_count

  target_group_arn = aws_lb_target_group.kubernetes_api.arn
  target_id        = aws_instance.control_plane[count.index].id
  port             = 6443
}

resource "aws_lb_target_group_attachment" "bastion_ssh" {
  count = var.enable_ssh_nlb_listener ? var.az_count : 0

  target_group_arn = aws_lb_target_group.bastion_ssh[0].arn
  target_id        = aws_instance.bastion[count.index].id
  port             = 22
}

resource "aws_launch_template" "worker" {
  name_prefix   = "${local.name_prefix}-worker-"
  image_id      = local.selected_ami_id
  instance_type = var.worker_instance_type
  key_name      = var.key_name

  iam_instance_profile {
    name = aws_iam_instance_profile.node.name
  }

  vpc_security_group_ids = [aws_security_group.worker.id]

  user_data = base64encode(templatefile("${path.module}/templates/kubernetes-node-user-data.sh.tpl", {
    aws_region                   = var.aws_region
    node_name                    = "${local.name_prefix}-worker"
    node_role                    = "worker"
    is_primary_control_plane     = "false"
    cluster_name                 = local.cluster_name
    kubernetes_version           = var.kubernetes_version
    kubernetes_minor_version     = var.kubernetes_minor_version
    kubeadm_token                = local.kubeadm_token
    pod_cidr                     = var.pod_cidr
    service_cidr                 = var.service_cidr
    calico_version               = var.calico_version
    ingress_nginx_version        = var.ingress_nginx_version
    ingress_node_port            = var.ingress_node_port
    api_endpoint                 = aws_lb.public_nlb.dns_name
    worker_join_parameter        = local.worker_join_parameter
    control_plane_join_parameter = local.control_plane_join_parameter
    install_ingress_nginx        = "false"
  }))

  block_device_mappings {
    device_name = "/dev/sda1"

    ebs {
      volume_size = var.root_volume_size_gb
      volume_type = "gp3"
      encrypted   = true
    }
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name                                      = "${local.name_prefix}-worker"
      Role                                      = "worker"
      "kubernetes.io/cluster/${local.cluster_name}" = "owned"
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "worker" {
  count = var.az_count

  name                      = "${local.name_prefix}-worker-asg-${count.index + 1}"
  min_size                  = var.worker_min_size
  desired_capacity          = var.worker_desired_size
  max_size                  = var.worker_max_size
  vpc_zone_identifier       = [aws_subnet.private[count.index].id]
  health_check_type         = "EC2"
  health_check_grace_period = 600
  target_group_arns         = [aws_lb_target_group.worker_ingress_http.arn]

  launch_template {
    id      = aws_launch_template.worker.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"

    preferences {
      min_healthy_percentage = 50
    }
  }

  tag {
    key                 = "Name"
    value               = "${local.name_prefix}-worker-${count.index + 1}"
    propagate_at_launch = true
  }

  tag {
    key                 = "Role"
    value               = "worker"
    propagate_at_launch = true
  }

  tag {
    key                 = "kubernetes.io/cluster/${local.cluster_name}"
    value               = "owned"
    propagate_at_launch = true
  }
}
