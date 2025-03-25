import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app/base_url';
import { Observable } from 'rxjs';
import { CreateFreelancerProfileRequest } from '../models/UserProfile';
import { FreelancerDetailsData } from '../models/Ui';

@Injectable({
  providedIn: 'root',
})
export class FreelancerProfileService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}

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

  updateFreelancerProfileData(
    id: number,
    freelancerData: FreelancerDetailsData
  ): Observable<any> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.patch(
      `${this.baseUrl}/api/freelancerProfiles/freelancerDetails/${id}`,
      freelancerData,
      { headers }
    );
  }
}
