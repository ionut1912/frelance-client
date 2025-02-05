import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatError,
    CommonModule
  ],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  @Input() mode: 'login' | 'register' = 'login';
  @Input() fields: { name: string; label: string; type: string; placeholder: string }[] = [];
  @Input() role?:'Freelancer' | 'Client' = 'Freelancer';

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: { [key: string]: any } = {};

    this.fields.forEach(field => {
      if (field.name === 'email') {
        controls[field.name] = ['', [Validators.required, Validators.email]];
      } else if (field.name === 'phoneNumber') {
        controls[field.name] = ['', [Validators.required, Validators.pattern('^[0-9]+$')]];
      } else {
        controls[field.name] = ['', Validators.required];
      }
    });
    this.form = this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
    else {
      console.warn('Form is invalid:', this.form.errors);
    }
  }
}
