import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import * as LanguageActions from '../actions/language.actions';

@Injectable()
export class LanguageEffects {
  actions$ = inject(Actions);
  loadLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.loadLanguages),
      mergeMap(() =>
        this.languageService.getLanguages().pipe(
          map((languages) =>
            LanguageActions.loadLanguagesSuccess({ languages })
          ),
          catchError((error) =>
            of(LanguageActions.loadLanguagesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private languageService: LanguageService) {}
}
