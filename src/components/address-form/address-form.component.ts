import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { Country } from '../../models/ExternalApis';
import { Field, FormComponent } from '../generic/form/form.component';

@Component({
  selector: 'app-address-form',
  imports: [FormComponent],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnChanges {
  @Input() countries: Country[] = [];
  @Input() filteredCountries: Country[] = [];
  @Input() filteredCitiesList: string[] = [];
  @Input() citiesLoading: boolean = false;
  @Input() countryFilterCtrl!: FormControl;
  @Input() cityFilterCtrl!: FormControl;

  fields: Field<Country | string>[] = [];


  ngOnInit(): void {
    this.initializeFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const countryFieldIndex = this.fields.findIndex(
      (f) => f.name === 'country'
    );
    if (
      countryFieldIndex !== -1 &&
      (changes['countries'] || changes['filteredCountries'])
    ) {
      this.fields[countryFieldIndex].options =
        this.filteredCountries && this.filteredCountries.length
          ? this.filteredCountries
          : this.countries;
    }
    const cityFieldIndex = this.fields.findIndex((f) => f.name === 'city');
    if (cityFieldIndex !== -1 && changes['filteredCitiesList']) {
      this.fields[cityFieldIndex].options = this.filteredCitiesList;
    }
  }

  initializeFields(): void {
    this.fields = [
      {
        name: 'country',
        type: 'select',
        label: 'Select a Country',
        options:
          this.filteredCountries && this.filteredCountries.length
            ? this.filteredCountries
            : this.countries,
        validators: [Validators.required],
        errorMessages: { required: 'Country is required' },
        extra: {
          search: true,
          searchControl: this.countryFilterCtrl,
          labelKey: 'name.common',
          required: true,
        },
      },
      {
        name: 'city',
        type: 'select',
        label: 'Select a City',
        options: this.filteredCitiesList,
        validators: [Validators.required],
        errorMessages: { required: 'City is required' },
        extra: {
          search: true,
          searchControl: this.cityFilterCtrl,
          required: true,
        },
      },
      {
        name: 'street',
        type: 'text',
        label: 'Street',
        placeholder: 'Enter street',
        validators: [Validators.required],
        errorMessages: { required: 'Street is required' },
      },
      {
        name: 'streetNumber',
        type: 'text',
        label: 'Street Number',
        placeholder: 'Enter street number',
        validators: [Validators.required],
        errorMessages: { required: 'Street number is required' },
      },
      {
        name: 'zipCode',
        type: 'text',
        label: 'Zipcode',
        placeholder: 'Enter zipcode',
        validators: [Validators.required],
        errorMessages: { required: 'Zipcode is required' },
      },
    ];
  }

  onFormSubmit(): void {
    // Further processing can be implemented here
  }
}
