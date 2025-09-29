import { AxiosError } from "axios";
import {
  ClientProfileDto,
  FreelancerProfileDto,
} from "../../models/UserProfile";
import { PaginatedList } from "../../models/Ui";

export interface UserProfileState {
  clientProfiles: ClientProfileDto[] | null;
  freelancerProfiles: FreelancerProfileDto[] | null;
  paginatedUserProfiles: PaginatedList<object> | null;
  loading: boolean;
  error: AxiosError | null;
}
