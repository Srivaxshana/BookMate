# Terraform for BookMate EC2

This folder contains a minimal Terraform configuration to provision a single EC2 instance for running the BookMate application.

Quick steps

1. Install Terraform (>= 1.0)
2. Configure AWS credentials in your environment (recommended) or via `~/.aws/credentials`.

   Example (Linux/macOS):

   ```bash
   export AWS_ACCESS_KEY_ID=...
   export AWS_SECRET_ACCESS_KEY=...
   export AWS_DEFAULT_REGION=us-east-1
   ```

3. Copy and edit `terraform.tfvars.example` to `terraform.tfvars` and set `key_name` if you want SSH access.

4. Run:

   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

Notes
- The configuration looks up the latest Ubuntu 20.04 LTS AMI (Canonical). If you prefer another AMI, update `data "aws_ami" "ubuntu"` in `main.tf`.
- The `key_name` variable is optional; leave empty to deploy without an SSH key (not recommended).
- Security group opens ports 22, 80 and 8080. Adjust `variables.tf`/`main.tf` as needed.
