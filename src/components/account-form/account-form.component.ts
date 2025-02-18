import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { LoginDto, RegisterDto } from '../../models/Accounts';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatError,
    CommonModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  @Input() mode: 'login' | 'register' = 'login';
  @Input() fields: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
  }[] = [];
  @Input() role?: 'Freelancer' | 'Client' = 'Freelancer';

  form!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const controls: { [key: string]: any } = {};

    this.fields.forEach((field) => {
      if (field.name === 'email') {
        controls[field.name] = ['', [Validators.required, Validators.email]];
      } else if (field.name === 'phoneNumber') {
        controls[field.name] = [
          '',
          [Validators.required, Validators.pattern('^[0-9]+$')],
        ];
      } else {
        controls[field.name] = ['', Validators.required];
      }
    });
    this.form = this.fb.group(controls);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else if (this.form.valid) {
      if (this.mode === 'login') {
        const payload: LoginDto = {
          username: this.form.value.username,
          email: this.form.value.email,
          password: this.form.value.password,
        };
        this.store.dispatch(AuthActions.login({ payload }));
      } else {
        const payload: RegisterDto = {
          email: this.form.value.email,
          password: this.form.value.password,
          username: this.form.value.username,
          phoneNumber: this.form.value.phoneNumber,
          role: this.role!,
        };
        this.store.dispatch(AuthActions.register({ payload }));
      }
    } else {
      console.warn('Form is invalid:', this.form.errors);
    }
  }
}
