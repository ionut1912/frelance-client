import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app/base_url';
import { Observable } from 'rxjs';
import {
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
} from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class FreelancerProfileService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}

  getCurrentFreelancerProfile(): Observable<FreelancerProfileDto> {
    const headers = new HttpHeaders({
      'requires-auth': '',
    });
    return this.http.get<FreelancerProfileDto>(
      `${this.baseUrl}/api/current/freelancerProfiles`,
      { headers }
    );
  }

  createFreelancerProfile(
    payload: CreateFreelancerProfileRequest
  ): Observable<any> {
    const headers = new HttpHeaders({
      'requires-auth': '',
    });
    return this.http.post(`${this.baseUrl}/api/freelancerProfiles`, payload, {
      headers,
    });
  }
}
