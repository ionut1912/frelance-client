import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app/base_url';
import { Observable } from 'rxjs';
import {
  ClientProfileDto,
  CreateClientProfileRequest,
} from '../models/ClientProfile';

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}

  getCurrentClientProfiles(): Observable<ClientProfileDto> {
    const headers = new HttpHeaders({
      'requires-auth': '',
    });
    return this.http.get<ClientProfileDto>(
      `${this.baseUrl}/api/current/clientProfiles`,
      { headers }
    );
  }
  createClientProfile(payload: CreateClientProfileRequest): Observable<any> {
    const headers = new HttpHeaders({
      'requires-auth': '',
    });
    return this.http.post(`${this.baseUrl}/api/clientProfiles`, payload, {
      headers,
    });
  }
}
