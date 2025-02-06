terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-tf-state-frontend"
    storage_account_name = "terraformdetailsfrontend"
    container_name       = "terraform-data-frontend"
    key                  = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.74.0"
    }
  }

  required_version = ">= 1.0"
}

provider "azurerm" {
  features {}

  subscription_id = "b6ca0b62-1042-4b7e-9412-6017fae69c8d"
}
