import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Field } from '../../../models/generics';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCard } from '@angular/material/card';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatButton,
    NgxMatSelectSearchModule,
    MatCard,
    DynamicFieldComponent,
  ],
})
export class FormComponent<T> implements OnInit {
  @Input() fields: Field<T>[] = [];
  @Input() submitLabel = '';
  @Input() initialData: any = {};
  @Input() formText = '';
  @Input() previousButton = false;
  @Input() nextButton = false;
  @Input() previousButtonLabel = 'Back';
  @Input() nextButtonLabel = 'Next';
  @Input() nextButtonDisabled = false;
  @Input() cardWrapper = false;
  @Input() stepper!: MatStepper;
  @Input() externalForm?: FormGroup;
  @Output() cameraCaptured = new EventEmitter<string>();
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();
  form!: FormGroup;
  passwordFieldFocused: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.externalForm) {
      this.form = this.externalForm;
      this.fields.forEach((field) => {
        if (!this.form.contains(field.name)) {
          this.form.addControl(
            field.name,
            new FormControl(
              this.initialData[field.name] || (field.extra?.multiple ? [] : ''),
              field.validators || []
            )
          );
          if (field.type === 'password') {
            field.extra = field.extra || {};
            field.extra.hide = true;
            this.passwordFieldFocused[field.name] = false;
          }
        }
      });
    } else {
      const group: Record<string, [unknown, ValidatorFn[]]> = {};
      this.fields.forEach((field) => {
        group[field.name] = [
          field.extra?.multiple
            ? this.initialData[field.name] || []
            : this.initialData[field.name] || '',
          field.validators || [],
        ];
        if (field.type === 'password') {
          field.extra = field.extra || {};
          field.extra.hide = true;
          this.passwordFieldFocused[field.name] = false;
        }
      });
      this.form = this.fb.group(group);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePassword(name: string): void {
    const field = this.fields.find((f) => f.name === name);
    if (field && field.extra) {
      field.extra.hide = !field.extra.hide;
    }
  }

  onCameraCaptured(fieldName: string, image: string): void {
    this.form.get(fieldName)?.setValue(image);
    this.cameraCaptured.emit(image);
  }

  onPasswordFocus(fieldName: string): void {
    this.passwordFieldFocused[fieldName] = true;
  }

  onPasswordBlur(fieldName: string): void {
    this.passwordFieldFocused[fieldName] = false;
  }
}
