import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Country } from '../../models/ExternalApis';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatStepperNext } from '@angular/material/stepper';

@Component({
  selector: 'app-address-form',
  imports: [
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    NgxMatSelectSearchModule,
    MatOption,
    NgForOf,
    NgIf,
    MatProgressSpinner,
    MatInput,
    MatButton,
    MatStepperNext,
    MatLabel
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() countryFilterCtrl!: FormControl;
  @Input() filteredCountries: Country[] = [];
  @Input() cityFilterCtrl!: FormControl;
  @Input() filteredCitiesList: string[] = [];
  @Input() citiesLoading: boolean = false;
}
