import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import * as UserProfileActions from '../actions/userprofile.actions';
import { mergeMap, withLatestFrom, map, tap, catchError } from 'rxjs/operators';
import { ClientProfileService } from '../../services/clientprofile.service';
import { UserProfileService } from '../../services/user-profile.service';
import { FreelancerProfileService } from '../../services/freelancerprofile.service';
import { Action } from '@ngrx/store';
import { RoleService } from '../../services/role.service';
import {
  ClientProfileDto,
  FreelancerProfileDto,
} from '../../models/UserProfile';
import { handleHttpError, handleLoad, handleSuccess } from '../../utils';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class UserProfilesEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private toaster = inject(ToastrService);

  loadCurrentUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.getCurrentUserProfile),
      mergeMap(() =>
        handleLoad(
          this.userProfileService.getCurrentUserProfile().pipe(
            withLatestFrom(this.roleService.role$),
            map(([userProfile, role]) => ({ userProfile, role }))
          ),
          ({ userProfile, role }) => {
            if (role === 'Client') {
              return UserProfileActions.getCurrentClientProfileResult({
                clientProfiles: [userProfile as ClientProfileDto],
              });
            } else if (role === 'Freelancer') {
              return UserProfileActions.getCurrentFreelancerProfileResult({
                freelancerProfiles: [userProfile as FreelancerProfileDto],
              });
            }
            return { type: 'NO_OP' } as Action;
          },
          (_) => ({ type: 'NO_OP' }) as Action
        )
      )
    )
  );

  createClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.createClientProfile),
      mergeMap((action) =>
        this.clientProfileService.createClientProfile(action.payload).pipe(
          mergeMap(() => [
            UserProfileActions.createClientProfileSuccess(),
            UserProfileActions.getCurrentUserProfile(),
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
            return of(UserProfileActions.createClientProfileFailure({ error }));
          })
        )
      )
    )
  );

  createFreelancerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.createFreelancerProfile),
      mergeMap((action) =>
        this.freelancerProfileService
          .createFreelancerProfile(action.payload)
          .pipe(
            mergeMap(() => [
              UserProfileActions.createFreelancerProfileSuccess(),
              UserProfileActions.getCurrentUserProfile(),
            ]),
            tap(() => {
              handleSuccess(
                this.zone,
                this.toaster,
                'Freelancer Profile Created'
              );
            }),
            catchError((error: HttpErrorResponse) => {
              handleHttpError(
                error,
                this.zone,
                this.toaster,
                'Freelancer Profile Creation Failed',
                'Unable to create Freelancer Profile'
              );
              return of(
                UserProfileActions.createFreelancerProfileFailure({
                  error,
                })
              );
            })
          )
      )
    )
  );

  deleteUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.deleteUserProfile),
      mergeMap((action) =>
        this.userProfileService.deleteUserProfile(action.profileId).pipe(
          withLatestFrom(this.roleService.role$),
          map(([_, role]) => {
            if (role === 'Client') {
              return UserProfileActions.deleteClientProfileSuccess({
                clientProfileId: action.profileId,
              });
            } else if (role === 'Freelancer') {
              return UserProfileActions.deleteFreelancerProfileSuccess({
                freelancerProfileId: action.profileId,
              });
            }
            return { type: 'NO_OP' } as Action;
          }),
          catchError(() => of({ type: 'NO_OP' } as Action))
        )
      )
    )
  );

  patchUserProfileAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.patchUserProfileAddress),
      mergeMap((action) =>
        this.userProfileService
          .updateUserProfileAddress(action.id, action.payload)
          .pipe(
            mergeMap(() => [UserProfileActions.getCurrentUserProfile()]),
            tap(() => {
              handleSuccess(
                this.zone,
                this.toaster,
                'User Profile Address Updated'
              );
            }),
            catchError((error: HttpErrorResponse) => {
              handleHttpError(
                error,
                this.zone,
                this.toaster,
                'User Profile Address update Failed',
                'Unable to update User Profile address'
              );
              return of(
                UserProfileActions.patchUserProfileAddressFailure({
                  error,
                })
              );
            })
          )
      )
    )
  );

  patchUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.patchUserProfileDetails),
      mergeMap((action) =>
        this.userProfileService
          .updateUserProfileDetails(action.id, action.payload)
          .pipe(
            mergeMap(() => [UserProfileActions.getCurrentUserProfile()]),
            tap(() => {
              handleSuccess(
                this.zone,
                this.toaster,
                'User Profile Details Updated'
              );
            }),
            catchError((error: HttpErrorResponse) => {
              handleHttpError(
                error,
                this.zone,
                this.toaster,
                'User Profile Details update Failed',
                'Unable to update User Details'
              );
              return of(
                UserProfileActions.patchUserProfileAddressFailure({
                  error,
                })
              );
            })
          )
      )
    )
  );

  patchFreelancerData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.patchFreelancerProfileDetails),
      mergeMap((action) =>
        this.freelancerProfileService
          .updateFreelancerProfileData(action.id, action.payload)
          .pipe(
            mergeMap(() => [UserProfileActions.getCurrentUserProfile()]),
            tap(() => {
              handleSuccess(
                this.zone,
                this.toaster,
                'Freelancer Profile Details Updated'
              );
            }),
            catchError((error: HttpErrorResponse) => {
              handleHttpError(
                error,
                this.zone,
                this.toaster,
                'Freelancer Profile Details update Failed',
                'Unable to update Freelancer Details'
              );
              return of(
                UserProfileActions.patchFreelancerDetailsFailure({
                  error,
                })
              );
            })
          )
      )
    )
  );

  getUserProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileActions.getUserProfiles),
      mergeMap((action) =>
        this.userProfileService
          .getUserProfiles(action.pageSize, action.pageNumber)
          .pipe(
            map((paginatedList) =>
              UserProfileActions.getUserProfilesSuccess({ paginatedList })
            )
          )
      )
    )
  );

  constructor(
    private clientProfileService: ClientProfileService,
    private freelancerProfileService: FreelancerProfileService,
    private userProfileService: UserProfileService,
    private roleService: RoleService
  ) {}
}
