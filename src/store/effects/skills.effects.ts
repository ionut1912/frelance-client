import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SkillActions from '../actions/skills.actions';
import { SkillsService } from '../../services/skills.service';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SkillsEffects {
  actions$ = inject(Actions);
  constructor(private skillsService: SkillsService) {}
  getSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SkillActions.getSkills),
      mergeMap(() =>
        this.skillsService
          .getSkills()
          .pipe(map((skills) => SkillActions.getSkillsResult({ skills })))
      )
    )
  );
}
