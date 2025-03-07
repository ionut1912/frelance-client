import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Field } from '../../../models/generics';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PasswordLegendComponent } from '../../password-legend/password-legend.component';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CameraCaptureComponent } from '../../canera-capture/camera-capture.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatFormField,
    MatInput,
    MatButton,
    MatIconButton,
    MatIcon,
    PasswordLegendComponent,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    MatProgressSpinner,
    CameraCaptureComponent,
    MatLabel,
    MatCard,
    MatError,
  ],
})
export class FormComponent<T> implements OnInit {
  @Input() fields: Field<T>[] = [];
  @Input() submitLabel = 'Submit';
  @Input() initialData: Record<string, unknown> = {};
  @Input() formText = '';
  @Input() previousButton = false;
  @Input() nextButton = false;
  @Input() previousButtonLabel = 'Back';
  @Input() nextButtonLabel = 'Next';
  @Input() nextButtonDisabled = false;
  @Input() cardWrapper = false;
  @Input() stepper!: MatStepper;

  // Use an external FormGroup if provided
  @Input() externalForm?: FormGroup;

  // Emit camera-captured image
  @Output() cameraCaptured = new EventEmitter<string>();
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();

  form!: FormGroup;
  passwordFieldFocused: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.externalForm) {
      this.form = this.externalForm;
      // Ensure each field is added to the external form if missing.
      this.fields.forEach(field => {
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
      // Otherwise, create our own form
      const group: Record<string, [unknown, ValidatorFn[]]> = {};
      this.fields.forEach(field => {
        group[field.name] = [
          field.extra?.multiple ? (this.initialData[field.name] || []) : (this.initialData[field.name] || ''),
          field.validators || []
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
    const field = this.fields.find(f => f.name === name);
    if (field && field.extra) {
      field.extra.hide = !field.extra.hide;
    }
  }

  // This method is called from the camera-capture component inside the template.
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

  getErrors(name: string): string[] {
    const control = this.form.get(name);
    if (!control || !control.errors || !(control.touched || control.dirty)) return [];
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
      if (value !== null) return String(value);
    }
    return String(option);
  }
}
