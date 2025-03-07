import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '../../../models/generics';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { PasswordLegendComponent } from '../../password-legend/password-legend.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CameraCaptureComponent } from '../../canera-capture/camera-capture.component';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  standalone: true,
  imports: [
    MatFormField,
    NgSwitch,
    NgSwitchCase,
    MatInput,
    ReactiveFormsModule,
    NgForOf,
    MatError,
    MatIcon,
    MatIconButton,
    NgIf,
    PasswordLegendComponent,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    MatProgressSpinner,
    CameraCaptureComponent,
    NgSwitchDefault,
    MatLabel,
  ],
})
export class DynamicFieldComponent<T> {
  @Input() field!: Field<T>;
  @Input() form!: FormGroup;
  @Input() passwordFieldFocused: { [key: string]: boolean } = {};
  @Output() cameraCaptured = new EventEmitter<{
    fieldName: string;
    image: string;
  }>();
  @Output() passwordFocus = new EventEmitter<string>();
  @Output() passwordBlur = new EventEmitter<string>();
  @Output() togglePasswordEvent = new EventEmitter<string>();

  getErrors(): string[] {
    const control = this.form.get(this.field.name);
    if (!control || !control.errors || !(control.touched || control.dirty))
      return [];
    return Object.keys(control.errors);
  }

  getOptionLabel(option: unknown): string {
    if (typeof option === 'object' && this.field.extra?.labelKey) {
      const keys = this.field.extra.labelKey.split('.');
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

  onCameraCaptured(image: string): void {
    this.form.get(this.field.name)?.setValue(image);
    this.cameraCaptured.emit({ fieldName: this.field.name, image });
  }

  onPasswordFocus(): void {
    this.passwordFocus.emit(this.field.name);
  }

  onPasswordBlur(): void {
    this.passwordBlur.emit(this.field.name);
  }

  togglePassword(): void {
    this.togglePasswordEvent.emit(this.field.name);
  }
}
