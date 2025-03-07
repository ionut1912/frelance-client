import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { navigateTo } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const token = sessionStorage.getItem('JwtToken');
    if (token) {
      return true;
    }
    navigateTo(this.router, '/unauthorized');
    return false;
  }
}
