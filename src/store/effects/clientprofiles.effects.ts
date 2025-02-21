import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientProfileActions from '../actions/clienprofile.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ClientProfileService } from '../../services/clientprofile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDetail } from '../../models/Errors';
import { of } from 'rxjs';
@Injectable()
export class ClientProfilesEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);
  loadClientProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientProfileActions.getCurrentClientProfile),
      mergeMap(() =>
        this.clientProfileService
          .getCurrentClientProfiles()
          .pipe(
            map((clientProfile) =>
              ClientProfileActions.getCurrentClientProfileResult({
                clientProfile,
              })
            )
          )
      )
    )
  );
  createClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientProfileActions.createClientProfile),
      mergeMap((action) =>
        this.clientProfileService.createClientProfile(action.payload).pipe(
          map(() => ClientProfileActions.createClientProfileSuccess()),
          tap(() => {
            this.zone.run(() => {
              this.toaster.success('Client Profile Created');
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.zone.run(() => {
              if (error.error === null) {
                this.toaster.error('Unable to create Client Profile');
              } else if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail: ErrorDetail) => {
                  this.toaster.error(errDetail.errorMessage);
                });
              } else {
                this.toaster.error('Client Profile Creation Failed');
              }
            });
            return of(
              ClientProfileActions.createClientProfileFailure({ error })
            );
          })
        )
      )
    )
  );
  constructor(private clientProfileService: ClientProfileService) {}
}
