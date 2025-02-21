import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, expand, reduce } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import * as CityActions from '../actions/city.actions';

@Injectable()
export class CityEffects {
  actions$ = inject(Actions);
  constructor(private http: HttpClient) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCities),
      mergeMap(({ country }) => {
        const pageSize = 1000;
        const urlForRow = (startRow: number) =>
          `http://api.geonames.org/searchJSON?country=${country.cca2}&featureClass=P&maxRows=${pageSize}&startRow=${startRow}&username=ionut12`;
        return this.http.get<any>(urlForRow(0)).pipe(
          expand((response, i) =>
            response.geonames && response.geonames.length === pageSize
              ? this.http.get<any>(urlForRow((i + 1) * pageSize))
              : EMPTY
          ),
          reduce(
            (all, current) => all.concat(current.geonames || []),
            [] as any[]
          ),
          map((cities) =>
            CityActions.loadCitiesSuccess({
              cities: cities.map((item: any) => item.name),
            })
          ),
          catchError((error) =>
            of(CityActions.loadCitiesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
