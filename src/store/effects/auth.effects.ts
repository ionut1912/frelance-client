import { inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorDetail } from '../../models/Errors';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
          tap(() => {
            this.zone.run(() => {
              this.toaster.success('Register success');
              this.router.navigateByUrl('/login').then(() => {});
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail: ErrorDetail) => {
                  this.toaster.error(errDetail.errorMessage);
                });
              } else {
                this.toaster.error('Registration failed');
              }
            });
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
          tap((loginSuccessful) => {
            this.zone.run(() => {
              this.toaster.success('Login successful');
              sessionStorage.setItem('JwtToken', loginSuccessful.user.token);
              const role = this.getRoleFromToken(loginSuccessful.user.token);
              if (role === 'Freelancer') {
                this.router.navigateByUrl('/freelancer').then((r) => {});
              } else {
                this.router.navigateByUrl('/client').then((r) => {});
              }
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail: ErrorDetail) => {
                  this.toaster.error(errDetail.errorMessage);
                });
              } else {
                this.toaster.error('Login failed');
              }
            });
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  getRoleFromToken(token: string): string | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(payload));
    return (
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      null
    );
  }

  constructor(private authService: AuthService) {}
}
