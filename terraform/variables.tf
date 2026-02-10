variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "key_name" {
  description = "Optional existing EC2 Key Pair name to allow SSH access"
  type        = string
  default     = "bookmate-deploy-key"
}

variable "ssh_cidr" {
  description = "CIDR block allowed to SSH (22)"
  type        = string
  default     = "0.0.0.0/0"

}
