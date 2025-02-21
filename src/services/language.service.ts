import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../models/ExternalApis';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private apiUrl = 'https://libretranslate.com/languages';
  constructor(private http: HttpClient) {}
  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.apiUrl}`);
  }
}
