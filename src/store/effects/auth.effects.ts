import { Injectable, inject, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ErrorDetail} from '../../models/ProblemDetails';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);
  private zone = inject(NgZone);
  private router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.payload).pipe(
          map(() => AuthActions.registerSuccess()),
          tap(() => {
            this.zone.run(() => {
              this.snackBar.open('Registration successful', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              this.router.navigateByUrl('/login').then(()=> {});
            });
          }),
          catchError((error:HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail:ErrorDetail) => {
                  this.snackBar.open(errDetail.errorMessage, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });
                });
              } else {

                this.snackBar.open("Registration failed", 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                });
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
      mergeMap(action =>
        this.authService.login(action.payload).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          tap((loginSuccess) => {
            this.zone.run(() => {
              sessionStorage.setItem('token', loginSuccess.user.token);
              this.snackBar.open('Login successful', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
            });
          }),
          catchError((error:HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail:ErrorDetail) => {
                  this.snackBar.open(errDetail.errorMessage, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });
                });

              } else {
                this.snackBar.open("Login failed", 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                });
              }
            });
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  constructor(private authService: AuthService) {}
}
