import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LanguageActions from '../actions/language.actions';
import { mergeMap } from 'rxjs/operators';
import { handleLoad } from '../../utils';
import { LanguageService } from '../../services/language.service';

@Injectable()
export class LanguageEffects {
  actions$ = inject(Actions);
  constructor(private languageService: LanguageService) {}

  loadLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.loadLanguages),
      mergeMap(() =>
        handleLoad(
          this.languageService.getLanguages(),
          (languages) => LanguageActions.loadLanguagesSuccess({ languages }),
          (error) => LanguageActions.loadLanguagesFailure({ error })
        )
      )
    )
  );
}
