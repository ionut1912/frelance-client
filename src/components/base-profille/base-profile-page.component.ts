import { Directive, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Country } from '../../models/ExternalApis';
import * as CountryActions from '../../store/actions/country.actions';
import * as CityActions from '../../store/actions/city.actions';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';

export interface BaseStore {
  countries: CountryState;
  cities: CityState;
}

@Directive()
export abstract class BaseProfilePageComponent implements OnInit {
  addressForm: FormGroup;
  userDataForm: FormGroup;
  countryFilterCtrl: FormControl = new FormControl('');
  cityFilterCtrl: FormControl = new FormControl('');
  filteredCountries: Country[] = [];
  filteredCitiesList: string[] = [];
  fullCountries: Country[] = [];
  fullCities: string[] = [];
  imageSrc: string | null = null;
  citiesLoading: boolean = false;

  protected constructor(
    protected fb: FormBuilder,
    protected store: Store<BaseStore>
  ) {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.userDataForm = this.fb.group({ bio: ['', Validators.required] });
  }

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());
    this.addressForm
      .get('country')!
      .valueChanges.subscribe((selectedCountry: Country) => {
        if (selectedCountry) {
          this.store.dispatch(
            CityActions.loadCities({ country: selectedCountry })
          );
        }
      });
    this.store
      .select((state) => state.countries.countries)
      .subscribe((countries) => {
        this.fullCountries = countries;
        this.filteredCountries = countries;
      });
    this.store
      .select((state) => state.cities.cities)
      .subscribe((cities) => {
        this.fullCities = cities;
        const search = this.cityFilterCtrl.value;
        this.filteredCitiesList = search
          ? cities.filter((city) =>
              city.toLowerCase().includes(search.toLowerCase())
            )
          : cities;
      });
    this.cityFilterCtrl.valueChanges.subscribe((search: string) => {
      this.filteredCitiesList = search
        ? this.fullCities.filter((city) =>
            city.toLowerCase().includes(search.toLowerCase())
          )
        : this.fullCities;
    });
    this.store
      .select((state) => state.cities.loading)
      .subscribe((loading) => (this.citiesLoading = loading));
    this.countryFilterCtrl.valueChanges.subscribe((search: string) => {
      this.filteredCountries = search
        ? this.fullCountries.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        : this.fullCountries;
    });
  }
}
