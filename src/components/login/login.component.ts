import { Component } from '@angular/core';
import {AccountFormComponent} from '../account-form/account-form.component';

@Component({
  selector: 'app-login',
  imports: [
    AccountFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' }
  ];
}
