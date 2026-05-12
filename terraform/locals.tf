locals {
  name_prefix  = "${var.project_name}-${var.environment}"
  cluster_name = "${local.name_prefix}-cluster"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  ssm_parameter_prefix = "/${var.project_name}/${var.environment}/${local.cluster_name}/kubeadm"

  worker_join_parameter        = "${local.ssm_parameter_prefix}/worker_join_command"
  control_plane_join_parameter = "${local.ssm_parameter_prefix}/control_plane_join_command"
}
