import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../app/base_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillDto } from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URL) private baseUrl: string
  ) {}
  getSkills(): Observable<SkillDto[]> {
    const headers = new HttpHeaders({
      'requires-auth': '',
    });
    return this.http.get<SkillDto[]>(`${this.baseUrl}/api/skills`, { headers });
  }
}
