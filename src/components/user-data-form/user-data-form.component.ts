import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../generic/form/form.component';
import { MatStepper } from '@angular/material/stepper';
import { Field } from '../../models/generics';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
  imports: [ReactiveFormsModule, FormComponent],
})
export class UserDataFormComponent implements OnInit {
  @Input() isFreelancer!: boolean;
  @Input() stepper!: MatStepper;
  @Output() imageCaptured = new EventEmitter<string>();

  fields: Field<string>[] = [];
  base64Image: string = '';

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

  onFormSubmit(): void {}
}
