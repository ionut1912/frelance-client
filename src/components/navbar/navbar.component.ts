import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpen: boolean = false;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
