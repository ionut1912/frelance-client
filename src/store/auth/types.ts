import { AxiosError } from "axios";
import { UserDto } from "../../models/Accounts";

export type UserRole = "Client" | "Freelancer";

export interface AuthState {
  user: UserDto | null;
  role: UserRole | null;
  error: AxiosError | null;
}
