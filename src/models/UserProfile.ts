import { UserProfileDto } from './Accounts';
import { TaskDto } from './Tasks';
import { ProjectDto } from './Projects';
import { ContractsDto } from './Contracts';
import { InvoicesDto } from './Invoices';

type Role = 'Freelancer' | 'Client';
interface ForeignLanguageDto {
  language: string;
}
interface BaseUpdateProfile{
  addressCountry?: string;
  addressStreet?: string;
  addressStreetNumber?: string;
  addressCity?: string;
  addressZip?: string;
  bio?: string;
  image?: string;
}
interface BaseProfileDto {
  id: number;
  user: UserProfileDto;
  address: AddressDto;
  bio: string;
  project?: ProjectDto[];
  contracts?: ContractsDto[];
  invoices?: InvoicesDto[];
  image: string;
  isVerified: boolean;
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
  portfolioUrl: string;
}

interface FreelancerProfileDto extends BaseProfileDto {
  tasks: TaskDto[];
  skills: SkillDto[];
  foreignLanguages: ForeignLanguageDto[];
  isAvailable: boolean;
  experience: string;
  rate: number;
  currency: string;
  rating: number;
  portfolioUrl: string;
}

interface UpdateFreelancerProfileRequest extends  BaseUpdateProfile{
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

interface ClientProfileDto extends BaseProfileDto {}

interface UpdateClientProfileRequest extends  BaseUpdateProfile{

}

interface SkillDto {
  id?: number;
  programmingLanguage: string;
  area: string;
}

interface VerifyFaceResult {
  isMatch: boolean;
  similarity: number;
}
interface FaceVerificationRequest {
  faceBase64Image: string;
}
interface VerifyFacePayload {
  faceVerificationRequest: FaceVerificationRequest;
  role: Role;
  profile: FreelancerProfileDto | ClientProfileDto;
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
  VerifyFaceResult,
  VerifyFacePayload,
  FaceVerificationRequest,
  Role,
  AddressDto,
};
