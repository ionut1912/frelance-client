import { AxiosResponse } from "axios";
import { api, API_URL } from "./utils";
import { SkillDto } from "../models/UserProfile";

export default function getSkills(): Promise<AxiosResponse<SkillDto[]>> {
  return api.get<SkillDto[]>(`${API_URL}/api/skills`, {
    headers: { "requires-auth": "" },
  });
}
