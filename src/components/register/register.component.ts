import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-register',
  imports: [AccountFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  role: 'Freelancer' | 'Client' = 'Freelancer';
  registerFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' }
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && history.state && typeof history.state['role'] !== 'undefined') {
      this.role = history.state['role'];
    }
  }
}
