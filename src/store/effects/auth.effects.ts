import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from "../../services/auth.service"
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.payload).pipe(
          map(() => AuthActions.registerSuccess()),
          tap(() => this.toastr.success('Registration successful')),
          catchError(error => {
            this.toastr.error('Registration failed');
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
          tap(() => this.toastr.success('Login successful')),
          catchError(error => {
            this.toastr.error('Login failed');
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private toastr: ToastrService) {}
}
