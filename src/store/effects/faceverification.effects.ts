import { Injectable, NgZone, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FaceVerificationService } from '../../services/faceverification.service';
import * as FaceVerificationActions from '../actions/faceverification.actions';
import * as UserProfileActions from '../actions/userprofile.actions';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, catchError, map, tap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { navigateTo } from '../../utils';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import {
  ClientProfileDto,
  FreelancerProfileDto,
  Role,
} from '../../models/UserProfile';
import { UserProfileService } from '../../services/user-profile.service';

@Injectable()
export class FaceVerificationEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);
  private store = inject(Store);
  private router = inject(Router);

  constructor(
    private faceVerificationService: FaceVerificationService,
    private userProfileService: UserProfileService
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
                this.processNoMatch(profile);
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
                this.dispatchProfileDeletion(action.payload.profile);
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
    const verify$: Observable<Action> =
      role === 'Freelancer'
        ? this.userProfileService.verifyUserProfile(profile.id).pipe(
            map(() =>
              UserProfileActions.verifyFreelancerProfile({
                profileId: profile.id,
              })
            )
          )
        : this.userProfileService.verifyUserProfile(profile.id).pipe(
            map(() =>
              UserProfileActions.verifyClientProfile({
                profileId: profile.id,
              })
            )
          );
    verify$.subscribe(() => {
      window.location.reload();
      this.store.dispatch(FaceVerificationActions.resetFalseCount());
    });
  }

  private processNoMatch(
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
          this.dispatchProfileDeletion(profile);
          this.toaster.error(
            `Your account will be locked for 1h because you attempted verification ${count} times`
          );
          navigateTo(this.router, '/');
        } else if (count === 9) {
          this.store.dispatch(
            AuthActions.deleteAccount({ id: profile.user.id })
          );
          this.dispatchProfileDeletion(profile);
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
    profile: ClientProfileDto | FreelancerProfileDto
  ): void {
    this.store.dispatch(
      UserProfileActions.deleteUserProfile({
        profileId: profile.id,
      })
    );
  }
}
