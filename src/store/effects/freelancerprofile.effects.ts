import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FreelancerProfileActions from '../actions/freelancerprofile.actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { FreelancerProfileService } from '../../services/freelancerprofile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { handleHttpError, handleSuccess, handleLoad } from '../../utils';
import { of } from 'rxjs';

@Injectable()
export class FreelancerProfileEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);

  loadCurrentFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerProfileActions.getCurrentFreelancerProfile),
      mergeMap(() =>
        handleLoad(
          this.freelancerProfileService.getCurrentFreelancerProfile(),
          (freelancerProfile) =>
            FreelancerProfileActions.getCurrentFreelancerProfileResult({
              freelancerProfiles: [freelancerProfile],
            }),
          (_) => ({ type: 'NO_OP' })
        )
      )
    )
  );

  createFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerProfileActions.createFreelancerProfile),
      mergeMap((action) =>
        this.freelancerProfileService
          .createFreelancerProfile(action.payload)
          .pipe(
            map(() =>
              FreelancerProfileActions.createFreelancerProfileSuccess()
            ),
            tap(() =>
              handleSuccess(
                this.zone,
                this.toaster,
                'Successfully created FreelancerProfile',
                () => {
                  window.location.reload();
                }
              )
            ),
            catchError((error: HttpErrorResponse) => {
              handleHttpError(
                error,
                this.zone,
                this.toaster,
                'Freelancer Profile Creation Failed',
                'Unable to create Freelancer Profile'
              );
              return of(
                FreelancerProfileActions.createFreelancerProfileFailure({
                  error,
                })
              );
            })
          )
      )
    )
  );
  deleteFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerProfileActions.deleteFreelancerProfile),
      mergeMap((action) =>
        this.freelancerProfileService.deleteFreelancerProfile(action.id).pipe(
          map(() =>
            FreelancerProfileActions.deleteFreelancerProfileSuccess({
              freelancerProfileId: action.id,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FreelancerProfileActions.deleteFreelancerProfileFailure({ error })
            )
          )
        )
      )
    )
  );
  constructor(private freelancerProfileService: FreelancerProfileService) {}
}
