variable "aws_region" {
  description = "AWS Region For All Resources."

  type    = string
  default = "us-east-1"
}

variable "token" {
  type        = string
  description = "github token to connect github repo"
  # default     = "" # "Your Gitub Token"
}

variable "repository" {
  type        = string
  description = "github repo url"
  default     = "https://github.com/CTB333/my-portfolio" # "YOUR SOURCE-CODE REPO URL"
}

variable "app_name" {
  type        = string
  description = "AWS Amplify App Name"
  default     = "portfolio"
}

variable "app_root" {
  type        = string
  description = "AWS Amplify App Name"
  default     = "client"
}

variable "branch_name" {
  type        = string
  description = "AWS Amplify App Repo Branch Name"
  default     = "main"
}


variable "domain_name" {
  type        = string
  description = "AWS Amplify Domain Name"
  default     = "WorkinOnIt.com"
}

variable "admin_policy" {
  type = string
  default = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
  description = "Default Build Policy For Amplify"
}

variable "backend_policy" {
  type = string
  default = "arn:aws:iam::aws:policy/service-role/AmplifyBackendDeployFullAccess"
  description = "Default Backend Policy For Amplify"
}