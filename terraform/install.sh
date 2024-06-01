#! /bin/sh

sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo yum -y install terraform
terraform -version
aws configure
terraform init
terraform apply --auto-approve -var-file="variables.tfvars"
source "./dev.sh"

