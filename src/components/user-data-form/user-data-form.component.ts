import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { CameraCaptureComponent } from '../canera-capture/camera-capture.component';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
  imports: [
    MatFormField,
    NgIf,
    MatInput,
    MatError,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatLabel,
    ReactiveFormsModule,
    CameraCaptureComponent,
  ],
})
export class UserDataFormComponent {
  @Input() formGroup!: FormGroup;
  base64Image: string = '';
  @Input() isFreelancer!: boolean;
  @Output() imageCaptured = new EventEmitter<string>();

  onImageCaptured(image: string): void {
    this.base64Image = image;
    this.imageCaptured.emit(this.base64Image);
  }
}
