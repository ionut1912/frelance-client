import { Injectable, inject, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ErrorDetail} from '../../models/ProblemDetails';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private zone = inject(NgZone);
  private router = inject(Router);
  private toaster=inject(ToastrService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.payload).pipe(
          map(() => AuthActions.registerSuccess()),
          tap(() => {
            this.zone.run(() => {
              this.toaster.success("Register success")
              this.router.navigateByUrl('/login').then(()=> {});
            });
          }),
          catchError((error:HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail:ErrorDetail) => {
                  this.toaster.error(errDetail.errorMessage);
                });
              } else {

                this.toaster.error("Registration failed")
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
          tap(() => {
            this.zone.run(() => {
              this.toaster.success("Login successful");
            });
          }),
          catchError((error:HttpErrorResponse) => {
            this.zone.run(() => {
              if (error && Array.isArray(error.error.errors)) {
                error.error.errors.forEach((errDetail:ErrorDetail) => {
                  this.toaster.error(errDetail.errorMessage);
                });

              } else {
                this.toaster.error("Login failed");
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
