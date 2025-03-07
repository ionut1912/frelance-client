import { Component } from '@angular/core';
import { FormComponent } from '../generic/form/form.component';
import { Validators } from '@angular/forms';
import { LoginDto } from '../../models/Accounts';
import * as AuthActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Field } from '../../models/generics';

@Component({
  selector: 'app-login',
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFields: Field<string>[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      validators: [Validators.required, Validators.email],
      errorMessages: {
        required: 'Email is required',
        email: 'The given email address is not in an email format',
      },
    },
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter your username',
      validators: [Validators.required],
      errorMessages: { required: 'Username is required' },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      validators: [Validators.required],
      errorMessages: { required: 'Password is required' },
    },
  ];
  constructor(private store: Store) {}
  onFormSubmit(formValue: Record<string, unknown>): void {
    const payload: LoginDto = {
      username: formValue['username'] as string,
      email: formValue['email'] as string,
      password: formValue['password'] as string,
    };
    this.store.dispatch(AuthActions.login({ payload }));
  }
}
