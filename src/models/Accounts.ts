import { ReviewsDto } from './Reviews';
import { ProposalsDto } from './Proposals';

interface LoginDto {
  username: string;
  password: string;
}

interface RegisterDto {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: string;
}

interface UserDto {
  phoneNumber: string;
  token: string;
  username: string;
  email: string;
}

interface UserProfileDto {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  reviews: ReviewsDto[];
  proposals: ProposalsDto[];
  createdAt: Date;
}

export type { LoginDto, RegisterDto, UserDto, UserProfileDto };
