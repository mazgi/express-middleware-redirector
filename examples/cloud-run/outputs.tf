output "endpoints" {
  value = {
    redirector = google_cloud_run_service.redirector.status[0].url
  }
}
