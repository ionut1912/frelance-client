import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_API_URL} from '../app/base_url';
import {RegisterDto} from '../models/RegisterDto';
import {LoginDto} from '../models/LoginDto';
import {UserDto} from '../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseUrl: string) {}

  register(payload: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register`, payload);
  }

  login(payload: LoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/api/login`, payload);
  }
}
