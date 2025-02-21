import { UserProfileDto } from './Accounts';
import { TaskDto } from './Tasks';
import { ProjectDto } from './Projects';
import { ContractsDto } from './Contracts';
import { InvoicesDto } from './Invoices';

interface ForeignLanguageDto {
  language: string;
}

interface CreateFreelancerProfileRequest {
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZip: string;
  bio: string;
  image: string;
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  rating: number;
  portfolioUrl: string;
}

interface FreelancerProfileDto {
  id: number;
  userProfile: UserProfileDto;
  address: AddressDto;
  bio: string;
  profileImageUrl: string;
  tasks: TaskDto[];
  skills: SkillDto[];
  foreignLanguages: ForeignLanguageDto[];
  projects?: ProjectDto[];
  isAvailable: boolean;
  experience: string;
  rate: number;
  currency: string;
  rating: number;
  portfolioUrl: string;
}

interface UpdateFreelancerProfileRequest {
  addressCountry?: string;
  addressStreet?: string;
  addressStreetNumber?: string;
  addressCity?: string;
  addressZip?: string;
  bio?: string;
  profileImage?: File;
  programingLanguages?: string[];
  areas?: string[];
  foreignLanguages?: string[];
  experience?: string;
  rate: number;
  currency?: string;
  rating: number;
  portfolioUrl?: string;
}

interface CreateClientProfileRequest {
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZip: string;
  bio: string;
  image: string;
}
interface AddressDto {
  id: number;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

interface ClientProfileDto {
  id: number;
  user: UserProfileDto;
  address: AddressDto;
  bio: string;
  image: string;
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
interface SkillDto {
  id: number;
  programmingLanguage: string;
  area: string;
}

export type {
  CreateClientProfileRequest,
  ClientProfileDto,
  UpdateClientProfileRequest,
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
  UpdateFreelancerProfileRequest,
  SkillDto,
  ForeignLanguageDto,
};
