import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetSkillsResult } from "../../models/UserProfile";
import getSkills from "../../services/skillsService";

export const loadSkills = createAsyncThunk<
  GetSkillsResult,
  void,
  { rejectValue: string }
>("skills/getSkills", async (_, { rejectWithValue }) => {
  try {
    const response = await getSkills();
    return { skills: response.data };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
