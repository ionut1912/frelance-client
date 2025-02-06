resource "azurerm_container_registry" "acr" {
  name                = "freelancewebacr"
  resource_group_name = azurerm_resource_group.freelance_client_rg.name
  location            = azurerm_resource_group.freelance_client_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_role_assignment" "freelance_client_acr_pull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.freelance_client_app.identity.0.principal_id
}


