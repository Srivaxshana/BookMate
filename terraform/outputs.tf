output "public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.bookmate.public_ip
}

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.bookmate.id
}

output "instance_public_dns" {
  description = "Public DNS name"
  value       = aws_instance.bookmate.public_dns
}


output "ssh_command" {
  value = "ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@${aws_instance.bookmate.public_ip}"
}


output "security_group_rules" {
  description = "Ingress rules for the Bookmate security group"
  value       = aws_security_group.bookmate_sg.ingress
}

output "mysql_data_volume_id" {
  description = "EBS Volume ID for MySQL data persistence"
  value       = aws_ebs_volume.mysql_data.id
}

output "mysql_data_volume_size" {
  description = "Size of MySQL data volume in GiB"
  value       = aws_ebs_volume.mysql_data.size
}

output "mysql_data_mount_point" {
  description = "Mount point path for MySQL data volume"
  value       = "/mnt/mysql-data"
}

output "app_data_volume_id" {
  description = "EBS Volume ID for Frontend/Backend app data"
  value       = aws_ebs_volume.app_data.id
}

output "app_data_volume_size" {
  description = "Size of app data volume in GiB"
  value       = aws_ebs_volume.app_data.size
}

output "app_data_mount_point" {
  description = "Mount point path for Frontend/Backend app data volume"
  value       = "/mnt/app-data"
}

output "elastic_ip" {
  description = "Elastic IP address (use this for accessing the application)"
  value       = data.aws_eip.bookmate_eip.public_ip
}