import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from '../actions/country.actions';
import { Country } from '../../models/ExternalApis';
import { mergeMap } from 'rxjs/operators';
import { handleLoad } from '../../utils';

@Injectable()
export class CountryEffects {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  actions$ = inject(Actions);
  constructor(private http: HttpClient) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        handleLoad(
          this.http.get<Country[]>(this.apiUrl),
          (countries) => CountryActions.loadCountriesSuccess({ countries }),
          (error) =>
            CountryActions.loadCountriesFailure({ error: error.message })
        )
      )
    )
  );
}
