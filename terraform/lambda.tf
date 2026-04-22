# Create Lambda Function

# # Setup Lamda Source File

locals {
  lambda_md5 = filemd5("${path.module}/lambda/graduation-rsvp/index.ts")
  date       = formatdate("YYYY-MM-DD-HH-mm", timestamp())
}

resource "terraform_data" "bootstrap" {
  triggers_replace = [
    "${timestamp()}" # Use To Reload File Every Run
    # local.lambda_md5 # Use To Reload File On Change Detection
  ]

  provisioner "local-exec" {
    command     = "npm run build"
    working_dir = "${path.module}/lambda/graduation-rsvp"
  }
}



data "archive_file" "lambda_zip_file" {
  type             = "zip"
  source_dir       = "${path.module}/lambda/graduation-rsvp/dist"
  output_file_mode = "0666"
  output_path      = "${path.module}/tmp/lambda/graduation-rsvp.zip"

  depends_on = [terraform_data.bootstrap]
}

# # Setup Lambda Policy

data "aws_iam_policy_document" "lambda_policy_doc" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  assume_role_policy = data.aws_iam_policy_document.lambda_policy_doc.json
  name               = "ZLA-Lambda-Role"
}

resource "aws_iam_role_policy_attachment" "lambda_exec_policy" {
  policy_arn = var.lambda_exec_policy
  role       = aws_iam_role.lambda_role.name
}

resource "aws_iam_role_policy_attachment" "logging_policy" {
  policy_arn = var.cloudwatch_exec_policy
  role       = aws_iam_role.lambda_role.name
}

# Create Cloudwatch Log Group
# Uncomment if unkown errors start to reoccur from backend

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/TondreauTechGraduationRsvp-${local.date}"
  retention_in_days = 1
}

# # Connect Lambda

resource "aws_lambda_function" "proxy_handler" {
  role = aws_iam_role.lambda_role.arn

  function_name    = "TondreauTechGraduationRsvp-${local.date}"
  filename         = data.archive_file.lambda_zip_file.output_path
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  timeout          = 30
  source_code_hash = data.archive_file.lambda_zip_file.output_base64sha256

  environment {
    variables = {
      MONGO_URI = var.mongo_uri
      LOGS      = "false"
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda_log_group]
}

#  Create API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name        = var.app_name
  description = "API for saving graduation RSVPs"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Create paths

resource "aws_api_gateway_resource" "api_parent_resource" {
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "graduation-rsvp"
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "proxy_path" {
  parent_id   = aws_api_gateway_resource.api_parent_resource.id
  path_part   = "{forwardPath+}"
  rest_api_id = aws_api_gateway_rest_api.api.id
}

# Create methods for paths

resource "aws_api_gateway_method" "cors_method" {
  authorization = "NONE"
  http_method   = "OPTIONS"
  resource_id   = aws_api_gateway_resource.proxy_path.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "any_method" {
  authorization = "NONE"
  http_method   = "ANY"
  resource_id   = aws_api_gateway_resource.proxy_path.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

# Create method integrations

resource "aws_api_gateway_integration" "cors_integration" {
  resource_id = aws_api_gateway_resource.proxy_path.id
  rest_api_id = aws_api_gateway_rest_api.api.id
  http_method = aws_api_gateway_method.cors_method.http_method

  type = "MOCK"
  request_templates = {
    "application/json" = jsonencode(
      {
        statusCode = 200
      }
    )
  }

  depends_on = [aws_api_gateway_method.cors_method]
}

resource "aws_api_gateway_integration" "any_method_integration" {
  http_method = aws_api_gateway_method.any_method.http_method
  resource_id = aws_api_gateway_resource.proxy_path.id
  rest_api_id = aws_api_gateway_rest_api.api.id

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.proxy_handler.invoke_arn

  depends_on = [aws_lambda_function.proxy_handler]
}

# Create response for CORS methods

resource "aws_api_gateway_method_response" "cors_response_200" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.proxy_path.id
  http_method = aws_api_gateway_method.cors_method.http_method

  status_code = 200
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  depends_on = [aws_api_gateway_method.cors_method]
}

resource "aws_api_gateway_integration_response" "cors_integration_response" {
  http_method = aws_api_gateway_integration.cors_integration.http_method
  resource_id = aws_api_gateway_resource.proxy_path.id
  rest_api_id = aws_api_gateway_rest_api.api.id

  status_code = aws_api_gateway_method_response.cors_response_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'*'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.cors_integration, aws_api_gateway_method_response.cors_response_200]
}

# Deploy API

resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api_parent_resource.id,
      aws_api_gateway_resource.proxy_path.id,
      aws_api_gateway_method.any_method.id,
      aws_api_gateway_integration.any_method_integration.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_integration.any_method_integration
  ]
}

resource "aws_api_gateway_stage" "api_stage" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "DEV"
}

resource "aws_lambda_permission" "permission" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.proxy_handler.function_name
  principal     = "apigateway.amazonaws.com" # Who will be calling the lambda function
  statement_id  = "AllowExecution"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}



output "graduatation_rsvp_api_url" {
  value = local.graduation_rsvp_url
}
