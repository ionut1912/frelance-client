import { AddressDto } from './UserProfile';

interface BaseProfileData{
  address:AddressDto;
  bio:string;
  image:string;
}

interface ClientProfileData extends  BaseProfileData{}

interface FreelancerProfileData extends BaseProfileData{
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface UserDetailsData{
  bio:string;
  image:string;
}

interface  FreelancerDetailsData{
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface DialogData{
  dialogName: string;
  address?:AddressDto;
  userDetails?:UserDetailsData;
  freelancerData?:FreelancerDetailsData;
}

export type {ClientProfileData,FreelancerProfileData,FreelancerDetailsData,UserDetailsData,DialogData};
