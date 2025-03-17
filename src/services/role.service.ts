import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject: BehaviorSubject<string>;
  role$: Observable<string>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let storedRole = '';
    if (isPlatformBrowser(this.platformId)) {
      storedRole = localStorage.getItem('role') || '';
    }
    this.roleSubject = new BehaviorSubject<string>(storedRole);
    this.role$ = this.roleSubject.asObservable();
  }

  setRole(role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', role);
    }
    this.roleSubject.next(role);
  }
}
