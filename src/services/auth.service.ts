import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BASE_API_URL } from '../app/base_url';
import { setToken } from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { LoginDto, RegisterDto, UserDto } from '../models/Accounts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string,
    private store: Store,
  ) {}

  register(payload: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register`, payload);
  }

  login(payload: LoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/api/login`, payload).pipe(
      tap((response) => {
        this.store.dispatch(setToken({ token: response.token }));
      }),
    );
  }
}
