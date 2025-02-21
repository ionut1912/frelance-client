import { createAction, props } from '@ngrx/store';
import { SkillDto } from '../../models/UserProfile';

const getSkills = createAction('[Data] Get Skills');
const getSkillsResult = createAction(
  '[Data] Get Skills Result',
  props<{ skills: SkillDto[] }>()
);

export { getSkills, getSkillsResult };
