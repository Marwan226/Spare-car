#!/usr/bin/env bash
set -euxo pipefail

exec > >(tee /var/log/bastion-bootstrap.log | logger -t bastion-bootstrap -s 2>/dev/console) 2>&1

hostnamectl set-hostname "${node_name}"

apt-get update -y
apt-get install -y awscli jq unzip curl

snap install amazon-ssm-agent --classic || true
systemctl enable --now snap.amazon-ssm-agent.amazon-ssm-agent.service || true

tmp_deb="/tmp/amazon-cloudwatch-agent.deb"
imds_token="$(curl -fsS -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")"
region="$(curl -fsS -H "X-aws-ec2-metadata-token: $imds_token" http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)"
url="https://s3.$region.amazonaws.com/amazoncloudwatch-agent-$region/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb"
curl -fsSL "$url" -o "$tmp_deb" && dpkg -i "$tmp_deb" || true

if [ -x /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl ]; then
  mkdir -p /opt/aws/amazon-cloudwatch-agent/etc
  cat >/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json <<EOF_CW
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/bastion-bootstrap.log",
            "log_group_name": "/aws/ec2/${node_name}/bootstrap",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/syslog",
            "log_group_name": "/aws/ec2/${node_name}/syslog",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
EOF_CW
  /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -s \
    -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json || true
fi
