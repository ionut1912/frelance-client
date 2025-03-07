import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormComponent } from '../generic/form/form.component';
import { Validators } from '@angular/forms';
import * as AuthActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { RegisterDto } from '../../models/Accounts';
import { Field } from '../../models/generics';

@Component({
  selector: 'app-register',
  imports: [FormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  role: 'Freelancer' | 'Client' = 'Freelancer';
  registerFields: Field<string>[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
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
      extra: { hide: true },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      validators: [Validators.required, Validators.pattern('^[0-9]+$')],
      errorMessages: {
        required: 'Phone number is required',
        pattern: 'Phone number should contains only digits',
      },
    },
  ];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store
  ) {}
  ngOnInit(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      history.state &&
      typeof history.state['role'] !== 'undefined'
    ) {
      this.role = history.state['role'];
    }
  }

  onFormSubmit(formValue: Record<string, unknown>): void {
    const payload: RegisterDto = {
      username: formValue['username'] as string,
      email: formValue['email'] as string,
      password: formValue['password'] as string,
      phoneNumber: formValue['phoneNumber'] as string,
      role: this.role,
    };
    this.store.dispatch(AuthActions.register({ payload }));
  }
}
