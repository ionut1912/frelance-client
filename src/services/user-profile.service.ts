import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app/base_url';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/generics';
import { AddressDto } from '../models/UserProfile';
import { UserDetailsData } from '../models/Ui';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}

  getUserProfiles(
    pageSize: number,
    pageNumber: number
  ): Observable<PaginatedList<object>> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.get<PaginatedList<object>>(
      `${this.baseUrl}/api/userProfiles?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      { headers }
    );
  }

  getCurrentUserProfile(): Observable<object> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.get<object>(`${this.baseUrl}/api/current/userProfiles`, {
      headers,
    });
  }

  updateUserProfileAddress(id: number, address: AddressDto): Observable<any> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.patch(
      `${this.baseUrl}/api/userProfiles/address/${id}`,
      address,
      { headers }
    );
  }

  updateUserProfileDetails(
    id: number,
    userDetails: UserDetailsData
  ): Observable<any> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.patch(
      `${this.baseUrl}/api/userProfiles/userDetails/${id}`,
      userDetails,
      { headers }
    );
  }

  verifyUserProfile(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.patch(
      `${this.baseUrl}/api/userProfiles/verify/${id}`,
      {},
      { headers }
    );
  }

  deleteUserProfile(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.delete(`${this.baseUrl}/api/userProfiles/${id}`, {
      headers,
    });
  }
}
