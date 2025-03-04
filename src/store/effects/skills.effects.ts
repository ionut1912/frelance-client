import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SkillActions from '../actions/skills.actions';
import { mergeMap } from 'rxjs/operators';
import { handleLoad } from '../../utils';
import { SkillsService } from '../../services/skills.service';

@Injectable()
export class SkillsEffects {
  actions$ = inject(Actions);
  constructor(private skillsService: SkillsService) {}

  getSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SkillActions.getSkills),
      mergeMap(() =>
        handleLoad(
          this.skillsService.getSkills(),
          (skills) => SkillActions.getSkillsResult({ skills }),
          (error) => ({ type: 'NO_OP' })
        )
      )
    )
  );
}
