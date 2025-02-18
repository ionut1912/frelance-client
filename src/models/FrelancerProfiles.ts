import { UserProfileDto } from './Accounts';
import { AddressDto } from './Addresses';
import { TaskDto } from './Tasks';
import { ForeignLanguageDto } from './ForeignLanguages';
import { SkillDto } from './Skills';
import { ProjectDto } from './Projects';

interface CreateFreelancerProfileRequest {
  addressCountry: string;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZip: string;
  bio: string;
  profileImage: File;
  programingLanguages: string[];
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

export type {
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
  UpdateFreelancerProfileRequest,
};
