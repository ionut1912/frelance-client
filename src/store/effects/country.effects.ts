import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CountryActions from '../actions/country.actions';
import { Country } from '../../models/ExternalApis';

@Injectable()
export class CountryEffects {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  actions$ = inject(Actions);
  constructor(private http: HttpClient) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.http.get<Country[]>(this.apiUrl).pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
