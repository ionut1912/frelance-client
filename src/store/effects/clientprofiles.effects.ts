import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientProfileActions from '../actions/clientprofile.actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { ClientProfileService } from '../../services/clientprofile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { handleHttpError, handleSuccess, handleLoad } from '../../utils';
import { Action } from '@ngrx/store';

@Injectable()
export class ClientProfilesEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);

  loadCurrentClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientProfileActions.getCurrentClientProfile),
      mergeMap(() =>
        handleLoad(
          this.clientProfileService.getCurrentClientProfiles(),
          (clientProfile) =>
            ClientProfileActions.getCurrentClientProfileResult({
              clientProfiles: [clientProfile],
            }),
          (_) => ({ type: 'NO_OP' }) as Action<string>
        )
      )
    )
  );

  createClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientProfileActions.createClientProfile),
      mergeMap((action) =>
        this.clientProfileService.createClientProfile(action.payload).pipe(
          mergeMap(() => [
            ClientProfileActions.createClientProfileSuccess(),
            ClientProfileActions.getCurrentClientProfile(),
          ]),
          tap(() => {
            handleSuccess(this.zone, this.toaster, 'Client Profile Created');
          }),
          catchError((error: HttpErrorResponse) => {
            handleHttpError(
              error,
              this.zone,
              this.toaster,
              'Client Profile Creation Failed',
              'Unable to create Client Profile'
            );
            return of(
              ClientProfileActions.createClientProfileFailure({ error })
            );
          })
        )
      )
    )
  );

  deleteClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientProfileActions.deleteClientProfile),
      mergeMap((action) =>
        this.clientProfileService
          .deleteClientProfile(action.clientProfileId)
          .pipe(
            map(() =>
              ClientProfileActions.deleteClientProfileSuccess({
                clientProfileId: action.clientProfileId,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(ClientProfileActions.deleteClientProfileFailure({ error }))
            )
          )
      )
    )
  );

  constructor(private clientProfileService: ClientProfileService) {}
}
