import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Field, FormComponent } from '../generic/form/form.component';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
  imports: [ReactiveFormsModule, FormComponent],
})
export class UserDataFormComponent implements OnInit {
  @Input() isFreelancer!: boolean;
  @Output() imageCaptured = new EventEmitter<string>();

  fields: Field<any>[] = [];
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
    ];
    if (this.isFreelancer) {
      this.fields.push({
        name: 'profileImage',
        type: 'camera',
        label: 'Capture Profile Image',
        validators: [Validators.required],
        errorMessages: { required: 'Image is required' },
      });
    }
  }

  onFormSubmit(): void {
    // Further processing can be implemented here
  }
}
