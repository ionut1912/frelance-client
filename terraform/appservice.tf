resource "azurerm_service_plan" "freelance_client_plan" {
  name                = "freelance-client-service-plan"
  location            = azurerm_resource_group.freelance_client_rg.location
  resource_group_name = azurerm_resource_group.freelance_client_rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "freelance_client_app" {
  name                = "freelance-client"
  location            = azurerm_resource_group.freelance_client_rg.location
  resource_group_name = azurerm_resource_group.freelance_client_rg.name
  service_plan_id     = azurerm_service_plan.freelance_client_plan.id
  https_only          = true

  site_config {
    always_on                               = false
    container_registry_use_managed_identity = true
  }

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "DOCKER_CUSTOM_IMAGE_NAME"            = "${azurerm_container_registry.acr.login_server}/freelance-client:latest"
    "WEBSITES_CONTAINER_START_TIME_LIMIT" = "1300"
    "PORT"                                = "80"
    "WEBSITES_PORT"                       = "80"
  }
}
