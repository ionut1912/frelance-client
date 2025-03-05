import { Injectable, NgZone, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FaceVerificationService } from '../../services/faceverification.service';
import { FreelancerProfileService } from '../../services/freelancerprofile.service';
import { ClientProfileService } from '../../services/clientprofile.service';
import * as FaceVerificationActions from '../actions/faceverification.actions';
import * as FreelancerProfileActions from '../actions/freelancerprofile.actions';
import * as ClientProfileActions from '../actions/clientprofile.actions';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, catchError, map, tap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { navigateTo } from '../../utils';
import { Router } from '@angular/router';
import {
  ClientProfileDto,
  FreelancerProfileDto,
  Role,
} from '../../models/UserProfile';

@Injectable()
export class FaceVerificationEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);
  private store = inject(Store);
  private router = inject(Router);

  constructor(
    private faceVerificationService: FaceVerificationService,
    private freelancerService: FreelancerProfileService,
    private clientService: ClientProfileService
  ) {}

  verifyFace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceVerificationActions.verifyFace),
      mergeMap((action) =>
        this.faceVerificationService
          .verifyFace(action.payload.faceVerificationRequest)
          .pipe(
            map((verifyFaceResult) =>
              FaceVerificationActions.verifyFaceSuccess({ verifyFaceResult })
            ),
            tap((successAction) => {
              const profile = action.payload.profile;
              if (successAction.verifyFaceResult.isMatch) {
                this.processMatch(action.payload.role, profile);
              } else {
                this.processNoMatch(action.payload.role, profile);
              }
            }),
            catchError((error: HttpErrorResponse) => {
              this.zone.run(() => {
                this.toaster.error(
                  'Face verification failed',
                  'Unable to verify face'
                );
              });
              if (error.status === 404) {
                this.toaster.warning(
                  'We will delete your profile data,because we don t find a face in one of your images'
                );
                this.dispatchProfileDeletion(
                  action.payload.role,
                  action.payload.profile
                );
              }
              return of(FaceVerificationActions.verifyFaceFailure({ error }));
            })
          )
      )
    )
  );

  private processMatch(
    role: Role,
    profile: ClientProfileDto | FreelancerProfileDto
  ): void {
    const verify$ =
      role === 'Freelancer'
        ? this.freelancerService
            .verifyFreelancerProfile(profile.id)
            .pipe(map(() => FreelancerProfileActions.verifyFreelancerProfile()))
        : this.clientService
            .verifyClientProfile(profile.id)
            .pipe(map(() => ClientProfileActions.verifyClientProfile()));
    verify$.subscribe(() => {
      window.location.reload();
      this.store.dispatch(FaceVerificationActions.resetFalseCount());
    });
  }

  private processNoMatch(
    role: Role,
    profile: ClientProfileDto | FreelancerProfileDto
  ): void {
    this.store.dispatch(FaceVerificationActions.incrementFalseCount());
    this.store
      .select((state: any) => state.faceVerification.falseCount)
      .pipe(take(1))
      .subscribe((count) => {
        if (count === 3 || count === 6) {
          this.store.dispatch(
            AuthActions.blockAccount({ id: profile.user.id })
          );
          this.dispatchProfileDeletion(role, profile);
          this.toaster.error(
            `Your account will be locked for 1h because you attempted verification ${count} times`
          );
          navigateTo(this.router, '/');
        } else if (count === 9) {
          this.store.dispatch(
            AuthActions.deleteAccount({ id: profile.user.id })
          );
          this.dispatchProfileDeletion(role, profile);
          this.store.dispatch(FaceVerificationActions.resetFalseCount());
          this.toaster.error(
            'Your account will be deleted because you attempted verification too many times'
          );
          navigateTo(this.router, '/');
        }
        this.toaster.warning(`Verification failed count: ${count}`);
      });
    this.toaster.warning(
      'Your profile picture and the captured picture are not similar'
    );
    this.toaster.warning('We will delete your profile and you can try again');
  }

  private dispatchProfileDeletion(
    role: Role,
    profile: ClientProfileDto | FreelancerProfileDto
  ): void {
    if (role === 'Client') {
      this.store.dispatch(
        ClientProfileActions.deleteClientProfile({ id: profile.id })
      );
    } else if (role === 'Freelancer') {
      this.store.dispatch(
        FreelancerProfileActions.deleteFreelancerProfile({ id: profile.id })
      );
    }
  }
}
