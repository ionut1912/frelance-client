import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatError,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatLabel,
  ],
  styleUrls: ['./user-data-form.component.scss'],
})
export class UserDataFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() imageSrc: string | null = null;
  @Output() fileSelectedEvent = new EventEmitter<Event>();
  @Input() isFreelancer!: boolean;

  fileSelected(event: Event): void {
    this.fileSelectedEvent.emit(event);
  }
}
