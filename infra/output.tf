output "vpc_id" {
  value = module.vpc.vpc_id
}

output "db_endpoint" {
  value = aws_db_instance.postgres.address
}

output "ecr_repo_url" {
  value = aws_ecr_repository.repo.repository_url
}

output "database_url_secret" {
  value = aws_secretsmanager_secret.db_secret.arn
}
