import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Field } from '../../../models/generics';
import { MatCard } from '@angular/material/card';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PasswordLegendComponent } from '../../password-legend/password-legend.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CameraCaptureComponent } from '../../canera-capture/camera-capture.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCard,
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    MatFormField,
    MatInput,
    MatError,
    MatIconButton,
    MatIcon,
    PasswordLegendComponent,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    MatProgressSpinner,
    CameraCaptureComponent,
    NgSwitchDefault,
    MatButton,
    MatLabel
  ],
})
export class FormComponent<T> implements OnInit {
  @Input() fields: Field<T>[] = [];
  @Input() submitLabel: string = 'Submit';
  @Input() initialData: Record<string, unknown> = {};
  @Input() formText: string = '';
  @Input() previousButton: boolean = false;
  @Input() nextButton: boolean = false;
  @Input() previousButtonLabel: string = 'Back';
  @Input() nextButtonLabel: string = 'Next';
  @Input() nextButtonDisabled: boolean = false;
  @Input() cardWrapper: boolean = false;
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();

  @Input() stepper!: MatStepper;

  form!: FormGroup;
  passwordFieldFocused: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: Record<string, [unknown, ValidatorFn[]]> = {};
    this.fields.forEach((field: Field<T>) => {
      // Use an empty array if multiple selection is enabled
      group[field.name] = [
        field.extra?.multiple
          ? (this.initialData[field.name] || [])
          : (this.initialData[field.name] || ''),
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

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePassword(name: string): void {
    const field = this.fields.find((f: Field<T>) => f.name === name);
    if (field && field.extra) {
      field.extra.hide = !field.extra.hide;
    }
  }

  onCameraCaptured(name: string, image: string): void {
    this.form.get(name)?.setValue(image);
  }

  onPasswordFocus(fieldName: string): void {
    this.passwordFieldFocused[fieldName] = true;
  }

  onPasswordBlur(fieldName: string): void {
    this.passwordFieldFocused[fieldName] = false;
  }

  getErrors(name: string): string[] {
    const control = this.form.get(name);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return [];
    }
    return Object.keys(control.errors);
  }

  getOptionLabel(option: unknown, field: Field<T>): string {
    if (typeof option === 'object' && field.extra?.labelKey) {
      const keys = field.extra.labelKey.split('.');
      let value: any = option;
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          value = null;
          break;
        }
      }
      if (value !== null) {
        return String(value);
      }
    }
    return String(option);
  }
}
