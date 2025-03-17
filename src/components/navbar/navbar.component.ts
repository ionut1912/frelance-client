import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { navigateTo } from '../../utils';
import { NavLinksService } from '../../services/nablinks.service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgIf, NgForOf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  navLinks: { label: string; url: string }[] = [];
  isOpen: boolean = false;
  constructor(
    private router: Router,
    private navLinksService: NavLinksService
  ) {}
  ngOnInit(): void {
    this.navLinksService.navLinks$.subscribe((links) => {
      this.navLinks = links;
    });
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    sessionStorage.removeItem('JwtToken');
    navigateTo(this.router, '/');
  }
}
