import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CityActions from '../actions/city.actions';

@Injectable()
export class CityEffects {
  actions$ = inject(Actions);
  constructor(private http: HttpClient) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCities),
      mergeMap(({ country }) => {
        // Use featureClass=P (populated places) to include cities, towns, and villages.
        // Replace 'demo' with your GeoNames username in production.
        const url = `http://api.geonames.org/searchJSON?country=${country.cca2}&featureClass=P&maxRows=1000&username=ionut12`;
        return this.http.get<any>(url).pipe(
          map((response) => {
            // The API returns an array of results in the "geonames" field.
            const cities =
              response.geonames?.map((item: any) => item.name) || [];
            return CityActions.loadCitiesSuccess({ cities });
          }),
          catchError((error) =>
            of(CityActions.loadCitiesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
