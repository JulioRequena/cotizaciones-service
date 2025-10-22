variable "aws_region" { default = "us-east-1" }
variable "project" { default = "cotizaciones" }
variable "cidr_vpc" { default = "10.0.0.0/16" }
variable "image_tag" {
  description = "Tag de la imagen Docker a desplegar"
  type        = string
}

