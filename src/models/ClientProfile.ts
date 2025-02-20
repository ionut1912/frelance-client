import { UserProfileDto } from './Accounts';
import { AddressDto } from './Addresses';
import { ContractsDto } from './Contracts';
import { ProjectDto } from './Projects';
import { InvoicesDto } from './Invoices';

interface CreateClientProfileRequest {
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZip: string;
  bio: string;
  image: string;
}

interface ClientProfileDto {
  id: number;
  user: UserProfileDto;
  address: AddressDto;
  bio: string;
  profileImageUrl: string;
  contracts?: ContractsDto[];
  projects?: ProjectDto[];
  invoices?: InvoicesDto[];
}

interface UpdateClientProfileRequest {
  addressCountry?: string;
  addressStreet?: string;
  addressStreetNumber?: string;
  addressCity?: string;
  addressZip?: string;
  bio?: string;
  image?: string;
}

export type {
  CreateClientProfileRequest,
  ClientProfileDto,
  UpdateClientProfileRequest,
};
