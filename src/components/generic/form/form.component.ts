import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CameraCaptureComponent } from '../../canera-capture/camera-capture.component';
import { PasswordLegendComponent } from '../../password-legend/password-legend.component';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export interface FieldExtra {
  hide?: boolean;
  search?: boolean;
  searchControl?: FormControl;
  labelKey?: string;
  multiple?: boolean;
  required?: boolean;
  loader?: boolean;
}

export interface Field<T> {
  name: string;
  type:
    | 'text'
    | 'password'
    | 'textarea'
    | 'select'
    | 'camera'
    | 'email'
    | 'tel';
  label: string;
  placeholder?: string;
  options?: T[];
  validators?: ValidatorFn[];
  errorMessages: { [key: string]: string };
  extra?: FieldExtra;
}

@Component({
  selector: 'app-form',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    MatInput,
    MatError,
    MatIconButton,
    MatIcon,
    MatOption,
    MatSelect,
    MatLabel,
    NgIf,
    NgxMatSelectSearchModule,
    CameraCaptureComponent,
    NgSwitchDefault,
    MatButton,
    PasswordLegendComponent,
    MatCard,
    MatProgressSpinner,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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
      group[field.name] = [
        this.initialData[field.name] || '',
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
