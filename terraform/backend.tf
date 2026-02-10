# Terraform State Backend Configuration
# This ensures state is persisted across Jenkins builds

terraform {
  backend "s3" {
    bucket      = "bookmate-terraform-state"
    key         = "bookmate/terraform.tfstate"
    region      = "ap-south-1"
    encrypt     = true
    use_lockfile = true
  }
}
