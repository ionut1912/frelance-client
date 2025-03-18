import { NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDetail } from './models/Errors';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Role } from './models/UserProfile';

function getRoleFromToken(token: string): Role | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(atob(payload));
  return (
    (decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ] as Role) || null
  );
}

function handleHttpError(
  error: HttpErrorResponse,
  zone: NgZone,
  toaster: ToastrService,
  defaultMessage: string,
  nullErrorMessage?: string
): void {
  zone.run(() => {
    if (error.error === null && nullErrorMessage) {
      toaster.error(nullErrorMessage);
    } else if (error.error && error.status === 404) {
      toaster.error(error.error.detail);
    } else if (error && Array.isArray(error.error.errors)) {
      error.error.errors.forEach((errDetail: ErrorDetail) => {
        toaster.error(errDetail.errorMessage);
      });
    } else {
      toaster.error(defaultMessage);
    }
  });
}

function handleSuccess(
  zone: NgZone,
  toaster: ToastrService,
  successMessage: string,
  callback?: () => void
): void {
  zone.run(() => {
    toaster.success(successMessage);
    if (callback) callback();
  });
}

function handleLoad<T, U extends Action, V extends Action>(
  observable: Observable<T>,
  transformSuccess: (data: T) => U,
  transformFailure: (error: any) => V
): Observable<U | V> {
  return observable.pipe(
    map((data: T): U => transformSuccess(data)),
    catchError((error: any) => of(transformFailure(error)))
  );
}

/**
 * Navigates based on role.
 * For Freelancer navigates to '/freelancer', else navigates to '/client'
 */
function navigateByRole(role: string, router: Router): void {
  if (role === 'Freelancer') {
    navigateTo(router, '/freelancer');
  } else {
    navigateTo(router, '/client');
  }
}

/**
 * Generic navigate method to replace direct calls to router.navigateByUrl.
 * Navigates to the specified path.
 */
function navigateTo(router: Router, path: string): void {
  router.navigate([path]).then(() => {});
}

export {
  getRoleFromToken,
  handleHttpError,
  handleSuccess,
  handleLoad,
  navigateByRole,
  navigateTo,
};
