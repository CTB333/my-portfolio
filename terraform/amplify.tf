data "aws_iam_policy_document" "this" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}


resource "aws_iam_role" "this" {
  name               = "test-role"
  assume_role_policy = data.aws_iam_policy_document.this.json
  managed_policy_arns = [
    var.admin_policy,
    var.backend_policy
  ]
}


resource "aws_amplify_app" "this" {
    name = var.app_name
    repository = var.repository
    access_token = var.token
    build_spec = file("./build.yml")

    platform = "WEB"
    enable_auto_branch_creation = true
    enable_branch_auto_build = true

    iam_service_role_arn = aws_iam_role.this.arn

    auto_branch_creation_patterns = [
        "*",
        "*/**",
    ]
    environment_variables = {
        Name           = var.app_name
        Provisioned_by = "Terraform"
        AMPLIFY_DIFF_DEPLOY = false
        AMPLIFY_MONOREPO_APP_ROOT = var.app_root

        REACT_APP_CAPTCHA="6LeRZ-YpAAAAAO9k5OSackA6EZBzf7va1antq8oY"
        REACT_APP_EMAIL_SERVICE="service_emrytxi"
        REACT_APP_EMAIL_TEMPLATE="template_r0oy6bh"
        REACT_APP_EMAIL_KEY="GzqxzqZRc5_oF4cCw"
    }
    
    custom_rule {
        source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|woff|ttf|map|json|pdf)$)([^.]+$)/>"
        status = "200"
        target = "/index.html"
    }
    custom_rule {
        source = "/<*>"
        status = "404"
        target = "/index.html"
    }

}

resource "aws_amplify_branch" "this" {
    app_id = aws_amplify_app.this.id
    branch_name = var.branch_name

    enable_auto_build = true
    framework = "React"
    stage     = "PRODUCTION"

    depends_on = [ aws_amplify_app.this ]
}

resource "aws_amplify_domain_association" "this" {
    app_id = aws_amplify_app.this.id
    domain_name = var.domain_name
    wait_for_verification = false

    # https://colintondreau.com
    sub_domain {
        branch_name = aws_amplify_branch.this.branch_name
        prefix = ""
    }

    depends_on = [ aws_amplify_app.this ]
}
