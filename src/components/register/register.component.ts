import {Component, OnInit} from '@angular/core';
import {AccountFormComponent} from '../account-form/account-form.component';

@Component({
  selector: 'app-register',
  imports: [
    AccountFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements  OnInit {
  role: 'Freelancer' | 'Client' = 'Freelancer';
  registerFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' }
  ];
  constructor() {
  }
  ngOnInit(): void {
    if (history.state && typeof history.state['role'] !== 'undefined') {
      this.role = history.state['role'];
    }
    console.log(this.role)
  }
}
