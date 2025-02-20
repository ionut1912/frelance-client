import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: (req: HttpRequest<any>) => Observable<HttpEvent<any>>
): Observable<HttpEvent<any>> => {
  let token: string | null = null;

  if (typeof window !== 'undefined' && window.sessionStorage) {
    token = sessionStorage.getItem('JwtToken');
  }

  if (token && req.headers.has('requires-auth')) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(
      clonedReq.clone({
        headers: clonedReq.headers.delete('requires-auth'),
      })
    );
  }

  return next(req);
};
