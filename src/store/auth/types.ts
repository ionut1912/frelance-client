import { AxiosError } from "axios";
import { UserDto } from "../../models/Accounts";
import { UserRole } from "../../models/UserProfile";

export interface AuthState {
  user: UserDto | null;
  role: UserRole | null;
  error: AxiosError | null;
}
