# =========================
# Módulo VPC
# =========================
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = var.project
  cidr   = var.cidr_vpc

  azs             = ["${var.aws_region}a", "${var.aws_region}b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}

# =========================
# Generar contraseña aleatoria para la base de datos
# =========================
resource "random_password" "db" {
  length  = 16
  special = false
}

# =========================
# RDS Subnet Group
# =========================
resource "aws_db_subnet_group" "rds_subnets" {
  name       = "${var.project}-rds-subnet-bam"
  subnet_ids = module.vpc.private_subnets
}

# =========================
# Security Group para RDS
# =========================
resource "aws_security_group" "rds_sg" {
  name        = "${var.project}-rds-sg-bam"
  description = "Allow ECS access to RDS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Postgres access"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# =========================
# RDS Instance
# =========================
resource "aws_db_instance" "postgres" {
  identifier             = "${var.project}-db"
  engine                 = "postgres"
  engine_version         = "12.22"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "cotizacionesbam"       # <-- CORRECCIÓN: antes 'name'
  username               = "cot_admin"
  password               = random_password.db.result
  db_subnet_group_name   = aws_db_subnet_group.rds_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
}

# =========================
# Secrets Manager
# =========================
resource "aws_secretsmanager_secret" "db_secret" {
  name = "${var.project}-db-url-bam"
}

resource "aws_secretsmanager_secret_version" "db_secret_value" {
  secret_id     = aws_secretsmanager_secret.db_secret.id
  secret_string = "postgresql://cot_admin:${random_password.db.result}@${aws_db_instance.postgres.address}:5432/cotizaciones"
}

# =========================
# ECR Repository
# =========================
resource "aws_ecr_repository" "repo" {
  name = "${var.project}-repo-bam"
}



