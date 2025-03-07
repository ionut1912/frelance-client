import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CityActions from '../../store/actions/city.actions';
import { Country } from '../../models/ExternalApis';
import { FormComponent } from '../generic/form/form.component';
import { MatStepper } from '@angular/material/stepper';
import { Field } from '../../models/generics';

@Component({
  selector: 'app-address-form',
  imports: [FormComponent],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() countries: Country[] = [];
  @Input() filteredCountries: Country[] = [];
  @Input() filteredCitiesList: string[] = [];
  @Input() citiesLoading: boolean = false;
  @Input() countryFilterCtrl!: FormControl;
  @Input() cityFilterCtrl!: FormControl;
  @Input() stepper!: MatStepper;

  @ViewChild(FormComponent) formComponent!: FormComponent<any>;

  fields: Field<Country | string>[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeFields();
  }

  ngAfterViewInit(): void {
    const countryControl = this.formComponent.form.get('country');
    if (countryControl) {
      countryControl.valueChanges.subscribe((selectedCountry: Country) => {
        if (selectedCountry) {
          this.store.dispatch(
            CityActions.loadCities({ country: selectedCountry })
          );
        }
      });
    }
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
    if (cityFieldIndex !== -1) {
      if (changes['citiesLoading'] && this.citiesLoading) {
        this.fields[cityFieldIndex].extra = {
          ...this.fields[cityFieldIndex].extra,
          loader: true,
        };
        this.fields[cityFieldIndex].options = [];
      } else if (changes['citiesLoading'] && !this.citiesLoading) {
        this.fields[cityFieldIndex].extra = {
          ...this.fields[cityFieldIndex].extra,
          loader: false,
        };
        this.fields[cityFieldIndex].options = this.filteredCitiesList;
      } else if (changes['filteredCitiesList']) {
        this.fields[cityFieldIndex].options = this.filteredCitiesList;
      }
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
          loader: this.citiesLoading,
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
    this.stepper.next();
  }
}
