import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { RoleService } from '../../services/role.service';
import { NavLinksService } from '../../services/nablinks.service';

@Component({
  selector: 'app-authenticated-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.scss',
})
export class AuthenticatedLayoutComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private navLinksService: NavLinksService
  ) {}

  ngOnInit(): void {
    this.roleService.role$.subscribe((role) => {
      if (role === 'Client') {
        let links = [
          { label: 'My Profile', url: '/user-profile' },
          { label: 'My Projects', url: '/projects' },
          { label: 'My Invoices', url: '/invoices' },
          { label: 'My Contracts', url: '/cotracts' },
          { label: 'My Proposals', url: '/proposals' },
          { label: 'Project Board', url: '/board' },
        ];
        this.navLinksService.setNavLinks(links);
      } else if (role === 'Freelancer') {
        let links = [
          { label: 'My Profile', url: '/user-profile' },
          { label: 'Projects', url: '/projects' },
          { label: 'Invoices', url: '/invoices' },
          { label: 'Contracts', url: '/cotracts' },
          { label: 'Proposals', url: '/proposals' },
        ];
        this.navLinksService.setNavLinks(links);
      }
    });
  }
}
