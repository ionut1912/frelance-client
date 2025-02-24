import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SkillDto } from '../../models/UserProfile';
import { Language } from '../../models/ExternalApis';
import { MatStepperPrevious } from '@angular/material/stepper';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-freelancer-profile-form',
  templateUrl: './freelancer-profile-form.component.html',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatInput,
    MatButton,
    MatError,
    MatLabel,
    MatStepperPrevious,
  ],
  styleUrls: ['./freelancer-profile-form.component.scss'],
})
export class FreelancerProfileFormComponent {
  @Input() freelancerProfileForm!: FormGroup;
  @Input() freelancerProfileSkills$!: Observable<SkillDto[]>;
  @Input() uniqueAreas$!: Observable<string[]>;
  @Input() filteredForeignLanguages$!: Observable<Language[]>;
  @Output() completeStepper = new EventEmitter<void>();
}
