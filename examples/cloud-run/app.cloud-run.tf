resource "google_cloud_run_service" "redirector" {
  name     = "${var.basename}-redirector"
  location = var.gcp_default_region
  template {
    spec {
      container_concurrency = 80
      containers {
        image = trimspace(file("${path.module}/tmp/docker-image-tag.redirector.txt"))
        resources {
          limits = {
            "cpu"    = "1000m"
            "memory" = "256M"
          }
        }
      }
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "1000"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
  metadata {
    namespace = var.gcp_project_id
  }
}

resource "google_cloud_run_service_iam_policy" "redirector" {
  location = google_cloud_run_service.redirector.location
  project  = google_cloud_run_service.redirector.project
  service  = google_cloud_run_service.redirector.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
