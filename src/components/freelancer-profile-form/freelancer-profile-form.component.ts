import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { SkillDto } from '../../models/UserProfile';
import { Language } from '../../models/ExternalApis';
import { Field, FormComponent } from '../generic/form/form.component';

@Component({
  selector: 'app-freelancer-profile-form',
  templateUrl: './freelancer-profile-form.component.html',
  imports: [ReactiveFormsModule, FormComponent],
  styleUrls: ['./freelancer-profile-form.component.scss'],
})
export class FreelancerProfileFormComponent implements OnInit {
  @Input() freelancerProfileSkills$!: Observable<SkillDto[]>;
  @Input() uniqueAreas$!: Observable<string[]>;
  @Input() filteredForeignLanguages$!: Observable<Language[]>;
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
        extra: { multiple: true },
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
        name: 'rating',
        type: 'text',
        label: 'Rating',
        placeholder: 'Enter rating',
        validators: [Validators.required],
        errorMessages: { required: 'Rating is required' },
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

    this.freelancerProfileSkills$.subscribe((skills: SkillDto[]) => {
      const field = this.fields.find((f) => f.name === 'programmingLanguages');
      if (field) {
        field.options = skills.map((s: SkillDto) => s.programmingLanguage);
      }
    });

    this.uniqueAreas$.subscribe((areas: string[]) => {
      const field = this.fields.find((f) => f.name === 'areas');
      if (field) {
        field.options = areas;
      }
    });

    this.filteredForeignLanguages$.subscribe((langs: Language[]) => {
      const field = this.fields.find((f) => f.name === 'foreignLanguages');
      if (field) {
        field.options = langs;
      }
    });
  }

  onFormSubmit(): void {
    this.completeStepper.emit();
  }
}
