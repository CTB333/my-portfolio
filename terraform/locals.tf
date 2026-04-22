locals {
  graduation_rsvp_url = "${aws_api_gateway_deployment.api_deployment.invoke_url}${aws_api_gateway_stage.api_stage.stage_name}/${aws_api_gateway_resource.api_parent_resource.path_part}"
  lambda_md5          = filemd5("${path.module}/lambda/graduation-rsvp/index.ts")
  date                = formatdate("YYYY-MM-DD", timestamp())
  time                = formatdate("HH-mm", timestamp())
}
