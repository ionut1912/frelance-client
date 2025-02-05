import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatCard,
    MatInput,
    MatError,
    MatLabel,
    CommonModule
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnInit {
  @Input() mode: 'login' | 'register' = 'login';
  @Input() fields: { name: string, label: string, type: string, placeholder: string }[] = [];
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: { [key: string]: any } = {};
    this.fields.forEach(field => {
      controls[field.name] = [
        '',
        field.name === 'email'
          ? [Validators.required, Validators.email]
          : Validators.required
      ];
    });
    this.form = this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Handle the submission logic (API call, etc.)
    }
  }
}
