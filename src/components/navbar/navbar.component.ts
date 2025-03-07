import { Component, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { navigateTo } from '../../utils';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgIf, NgForOf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() links: { label: string; url: string }[] = [];
  isOpen: boolean = false;
  constructor(private router: Router) {}
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    sessionStorage.removeItem('JwtToken');
    navigateTo(this.router, '/');
  }
}
