import { UserProfileDto } from "./Accounts";
import { TaskDto } from "./Tasks";
import { ProjectDto } from "./Projects";
import { ContractsDto } from "./Contracts";
import { InvoicesDto } from "./Invoices";
import { FreelancerDetailsData, UserDetailsData } from "./Ui";
import { NavigateFunction } from "react-router-dom";

export type UserRole = "Client" | "Freelancer";

interface ForeignLanguageDto {
  language: string;
}
interface BaseUpdateProfile {
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

interface FreelancerData {
  programmingLanguages: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface CreateFreelancerProfileRequest {
  address: AddressData;
  user: UserData;
  freelancer: FreelancerData;
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

interface UpdateFreelancerProfileRequest extends BaseUpdateProfile {
  programingLanguages?: string[];
  areas?: string[];
  foreignLanguages?: string[];
  experience?: string;
  rate: number;
  currency?: string;
  rating: number;
  portfolioUrl?: string;
}

interface AddressData {
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZip: string;
}

interface UserData {
  bio: string;
  image: string;
}
interface CreateClientProfileRequest {
  address: AddressData;
  user: UserData;
}
interface AddressDto {
  id: number;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

interface PatchUserProfileAddressRequest {
  profileId: number;
  address: AddressDto;
}

interface PatchFreelancerProfielRequest {
  profileId: number;
  freelancerData: FreelancerDetailsData;
}

interface PatchUserDetailsRequest {
  profileId: number;
  userData: UserDetailsData;
}
interface ClientProfileDto extends BaseProfileDto {}

interface UpdateClientProfileRequest extends BaseUpdateProfile {}

interface SkillDto {
  id?: number;
  programmingLanguage: string;
  area: string;
}

interface GetSkillsResult {
  skills: SkillDto[];
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
  role: UserRole;
  profile: FreelancerProfileDto | ClientProfileDto;
}

interface VerifyFaceRequest {
  faceVerificationRequest: FaceVerificationRequest;
  profile: ClientProfileDto | FreelancerProfileDto;
  navigate: NavigateFunction;
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
  AddressData,
  UserData,
  FreelancerData,
  VerifyFaceResult,
  VerifyFacePayload,
  FaceVerificationRequest,
  AddressDto,
  PatchFreelancerProfielRequest,
  PatchUserProfileAddressRequest,
  PatchUserDetailsRequest,
  GetSkillsResult,
  VerifyFaceRequest,
};
