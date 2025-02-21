import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FreelancerProfileActions from '../actions/freelancerprofile.actions';
import { mergeMap, of } from 'rxjs';
import { FreelancerProfileService } from '../../services/freelancerprofile.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDetail } from '../../models/Errors';

@Injectable()
export class FreelancerProfileEffects {
  actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);

  constructor(private freelancerProfileService: FreelancerProfileService) {}

  loadCurrentFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerProfileActions.getCurrentFreelancerProfile),
      mergeMap(() =>
        this.freelancerProfileService
          .getCurrentFreelancerProfile()
          .pipe(
            map((freelancerProfile) =>
              FreelancerProfileActions.getCurrentFreelancerProfileResult({
                freelancerProfile,
              })
            )
          )
      )
    )
  );

  createFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerProfileActions.createFreelancerProfile),
      mergeMap(
        (
          action: ReturnType<
            typeof FreelancerProfileActions.createFreelancerProfile
          >
        ) =>
          this.freelancerProfileService
            .createFreelancerProfile(action.payload)
            .pipe(
              map(() =>
                FreelancerProfileActions.createFreelancerProfileSuccess()
              ),
              tap(() => {
                this.zone.run(() => {
                  this.toaster.success(
                    'Successfully created FreelancerProfile'
                  );
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
                    this.toaster.error('Freelancer0 Profile Creation Failed');
                  }
                });
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
}
