resource "azurerm_service_plan" "freelance_client_plan" {
  name                = "frelance-client-service-plan"
  location            = azurerm_resource_group.freelance_client_rg.location
  resource_group_name = azurerm_resource_group.freelance_client_rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}
resource "azurerm_linux_web_app" "freelance_client" {
  name                = "freelance-client"
  location            = azurerm_resource_group.freelance_client_rg.location
  resource_group_name = azurerm_resource_group.freelance_client_rg.name
  service_plan_id     = azurerm_service_plan.freelance_client_plan.id
  https_only     = true

  site_config {
    always_on = false
    application_stack {
      docker_image     = "${azurerm_container_registry.acr.login_server}/frelance-api"
      docker_image_tag = "latest"
    }

  }

  identity {
    type = "SystemAssigned"
  }
}

# Assign the correct ACR pull role
resource "azurerm_role_assignment" "acr_pull" {
  principal_id         = azurerm_linux_web_app.freelance_client.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}
