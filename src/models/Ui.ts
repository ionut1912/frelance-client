import { AddressDto } from "./UserProfile";

interface BaseProfileData {
  address: AddressDto;
  bio: string;
  image: string;
}

interface ClientProfileData extends BaseProfileData {}

interface FreelancerProfileData extends BaseProfileData {
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface UserDetailsData {
  bio: string;
  image: string;
}

interface FreelancerDetailsData {
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface DialogData {
  userProfileId: number;
  dialogName: string;
  address?: AddressDto;
  userDetails?: UserDetailsData;
  freelancerData?: FreelancerDetailsData;
}

interface PaginatedDataRequest {
  pageSize: number;
  pageNumber: number;
}

interface PaginatedList<T> {
  totalPages: number;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  items: T[];
}

export type {
  ClientProfileData,
  FreelancerProfileData,
  FreelancerDetailsData,
  UserDetailsData,
  DialogData,
  PaginatedList,
  PaginatedDataRequest,
};
