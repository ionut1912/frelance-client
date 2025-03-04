import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app/base_url';
import { Observable } from 'rxjs';
import {
  FaceVerificationRequest,
  VerifyFaceResult,
} from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class FaceVerificationService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}

  verifyFace(
    faceVerificationRequest: FaceVerificationRequest
  ): Observable<VerifyFaceResult> {
    const headers = new HttpHeaders({ 'requires-auth': '' });
    return this.http.post<VerifyFaceResult>(
      `${this.baseUrl}/api/verifyFace`,
      faceVerificationRequest,
      { headers }
    );
  }
}
