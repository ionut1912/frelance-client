import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Field } from '../../models/generics';
import { MatStepper } from '@angular/material/stepper';
import { FormComponent } from '../generic/form/form.component';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent],
})
export class UserDataFormComponent implements OnInit {
  @Input() isFreelancer!: boolean;
  @Input() stepper!: MatStepper;
  @Input() externalForm!: FormGroup;

  @Output() imageCaptured = new EventEmitter<string>();
  @Output() completeStepper = new EventEmitter<void>();
  fields: Field<string>[] = [];

  ngOnInit(): void {
    this.fields = [
      {
        name: 'bio',
        type: 'textarea',
        label: 'Bio',
        placeholder: 'Enter your bio',
        validators: [Validators.required],
        errorMessages: { required: 'Bio is required' },
      },
      {
        name: 'profileImage',
        type: 'camera',
        label: 'Capture Profile Image',
        validators: [Validators.required],
        errorMessages: { required: 'Image is required' },
      },
    ];
  }

  onFormSubmit(): void {
    if(!this.isFreelancer){
      this.completeStepper.emit();
    }
  }


  handleCameraCapture(image: string): void {
    this.imageCaptured.emit(image);
  }
}
