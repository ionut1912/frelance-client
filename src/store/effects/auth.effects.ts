import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  getRoleFromToken,
  handleHttpError,
  handleSuccess,
  navigateByRole,
  navigateTo,
} from '../../utils';
import { RoleService } from '../../services/role.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register(action.payload).pipe(
          map(() => AuthActions.registerSuccess()),
          tap(() =>
            handleSuccess(this.zone, this.toaster, 'Register success', () => {
              navigateTo(this.router, '/login');
            })
          ),
          catchError((error: HttpErrorResponse) => {
            handleHttpError(
              error,
              this.zone,
              this.toaster,
              'Registration failed'
            );
            return of(AuthActions.registerFailure({ error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.payload).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          tap((loginSuccessful) =>
            handleSuccess(this.zone, this.toaster, 'Login successful', () => {
              sessionStorage.setItem('JwtToken', loginSuccessful.user.token);
              const role = getRoleFromToken(loginSuccessful.user.token);
              if (role) {
                this.roleService.setRole(role);
                navigateByRole(role, this.router);
              }
            })
          ),
          catchError((error: HttpErrorResponse) => {
            handleHttpError(error, this.zone, this.toaster, 'Login failed');
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  blockAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.blockAccount),
      mergeMap((action) =>
        this.authService.blockAccount(action.id).pipe(
          map(() => AuthActions.blockAccountSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(AuthActions.blockAccountFailure({ error }))
          )
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteAccount),
      mergeMap((action) =>
        this.authService.deleteAccount(action.id).pipe(
          map(() => AuthActions.deleteAccountSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(AuthActions.deleteAccountFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private roleService: RoleService
  ) {}
}
