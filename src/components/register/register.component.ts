import { Component } from '@angular/core';
import {AccountFormComponent} from '../account-form/account-form.component';

@Component({
  selector: 'app-register',
  imports: [
    AccountFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' }
  ];
}
