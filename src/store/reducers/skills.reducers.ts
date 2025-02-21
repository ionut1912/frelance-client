import { createReducer, on } from '@ngrx/store';
import * as SkillsActions from '../actions/skills.actions';
import { SkillDto } from '../../models/UserProfile';

export interface SkillsState {
  skills: SkillDto[];
}
const initialState: SkillsState = {
  skills: [],
};

export const skillReducer = createReducer(
  initialState,
  on(SkillsActions.getSkills, (state) => ({ ...state })),
  on(SkillsActions.getSkillsResult, (state, { skills }) => ({
    ...state,
    skills,
  }))
);
