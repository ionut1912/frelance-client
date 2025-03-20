import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Field } from '../../models/generics';
import { SkillDto } from '../../models/UserProfile';
import { Language } from '../../models/ExternalApis';
import { MatStepper } from '@angular/material/stepper';
import { FormComponent } from '../generic/form/form.component';
import { FreelancerProfileData } from '../../models/Ui';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-freelancer-profile-form',
  templateUrl: './freelancer-profile-form.component.html',
  styleUrls: ['./freelancer-profile-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent, NgIf],
})
export class FreelancerProfileFormComponent implements OnInit {
  @Input() freelancerProfileSkills$!: Observable<SkillDto[]>;
  @Input() uniqueAreas$!: Observable<string[]>;
  @Input() filteredForeignLanguages$!: Observable<Language[]>;
  @Input() stepper!: MatStepper;
  @Input() freelancerData!: FreelancerProfileData;
  @Input() isDialog: boolean = false;
  @Input() externalForm!: FormGroup;

  @Output() completeStepper = new EventEmitter<void>();

  fields: Field<SkillDto | string | Language>[] = [];

  ngOnInit(): void {
    this.fields = [
      {
        name: 'programmingLanguages',
        type: 'select',
        label: 'Programming Languages',
        options: [],
        validators: [Validators.required],
        errorMessages: { required: 'Programming Languages is required' },
        extra: { multiple: true },
      },
      {
        name: 'areas',
        type: 'select',
        label: 'Area',
        options: [],
        validators: [Validators.required],
        errorMessages: { required: 'Area is required' },
        extra: { multiple: true },
      },
      {
        name: 'foreignLanguages',
        type: 'select',
        label: 'Foreign Languages',
        options: [],
        validators: [Validators.required],
        errorMessages: { required: 'Foreign Language is required' },
        extra: { multiple: true, labelKey: 'name' },
      },
      {
        name: 'experience',
        type: 'text',
        label: 'Experience',
        placeholder: 'Enter experience',
        validators: [Validators.required],
        errorMessages: { required: 'Experience is required' },
      },
      {
        name: 'rate',
        type: 'text',
        label: 'Rate',
        placeholder: 'Enter rate',
        validators: [Validators.required],
        errorMessages: { required: 'Rate is required' },
      },
      {
        name: 'currency',
        type: 'text',
        label: 'Currency',
        placeholder: 'Enter currency',
        validators: [Validators.required],
        errorMessages: { required: 'Currency is required' },
      },
      {
        name: 'portfolioUrl',
        type: 'text',
        label: 'Portfolio URL',
        placeholder: 'Enter portfolio URL',
        validators: [Validators.required],
        errorMessages: { required: 'Portfolio URL is required' },
      },
    ];

    this.freelancerProfileSkills$.subscribe((skills) => {
      const field = this.fields.find((f) => f.name === 'programmingLanguages');
      if (field)
        field.options = skills.map((s: SkillDto) => s.programmingLanguage);
    });

    this.uniqueAreas$.subscribe((areas) => {
      const field = this.fields.find((f) => f.name === 'areas');
      if (field) field.options = areas;
    });

    this.filteredForeignLanguages$.subscribe((langs) => {
      const field = this.fields.find((f) => f.name === 'foreignLanguages');
      if (field) field.options = langs;
    });
  }

  onFormSubmit(): void {
    this.completeStepper.emit();
  }
}
