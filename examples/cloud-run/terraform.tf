# --------------------------------
# Terraform configuration

terraform {
  required_version = "0.12.9"

  required_providers {
    google      = "3.13.0"
    google-beta = "3.13.0"
  }

  backend "gcs" {
    prefix = "default/terraform"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_default_region
  zone    = "${var.gcp_default_region}-a"
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = var.gcp_default_region
  zone    = "${var.gcp_default_region}-a"
}

# https://www.terraform.io/docs/providers/google/guides/version_3_upgrade.html#google_project_services-has-been-removed-from-the-provider
resource "google_project_service" "service" {
  for_each = toset([
    "dns.googleapis.com",
    "run.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ])

  service = each.key

  project            = var.gcp_project_id
  disable_on_destroy = false
}
