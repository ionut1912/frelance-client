import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject: BehaviorSubject<Role>;
  role$: Observable<Role>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let storedRole:Role="Client";
    if (isPlatformBrowser(this.platformId)) {
      storedRole = localStorage.getItem('role') as Role|| 'Client';
    }
    this.roleSubject = new BehaviorSubject<Role>(storedRole);
    this.role$ = this.roleSubject.asObservable();
  }

  setRole(role: Role): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', role);
    }
    this.roleSubject.next(role);
  }
}
