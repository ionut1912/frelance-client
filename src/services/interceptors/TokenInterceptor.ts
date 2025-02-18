import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ auth: AuthState }>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store
      .select((state) => state.auth.token)
      .pipe(
        take(1),
        switchMap((token) => {
          if (token && req.headers.has('Requires-Auth')) {
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            return next.handle(
              clonedReq.clone({
                headers: clonedReq.headers.delete('Requires-Auth'),
              }),
            );
          }

          return next.handle(req);
        }),
      );
  }
}
