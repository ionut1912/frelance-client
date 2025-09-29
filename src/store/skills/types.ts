import { AxiosError } from "axios";
import { SkillDto } from "../../models/UserProfile";

export interface SkillsState {
  skills: SkillDto[];
  error: AxiosError | null;
  loading: boolean;
}
