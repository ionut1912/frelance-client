import { Directive, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Country } from '../../models/ExternalApis';
import * as CountryActions from '../../store/actions/country.actions';
import * as CityActions from '../../store/actions/city.actions';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import { startWith, map } from 'rxjs/operators';

export interface BaseStore {
  countries: CountryState;
  cities: CityState;
}

@Directive()
export abstract class BaseProfilePageComponent implements OnInit {
  addressForm: FormGroup;
  userDataForm: FormGroup;
  countryFilterCtrl: FormControl;
  cityFilterCtrl: FormControl;
  filteredCountries: Country[] = [];
  filteredCitiesList: string[] = [];
  imageSrc: string | null = null;
  citiesLoading: boolean = false;

  protected constructor(
    protected fb: FormBuilder,
    protected store: Store<BaseStore>
  ) {
    this.countryFilterCtrl = new FormControl('');
    this.cityFilterCtrl = new FormControl('');
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.userDataForm = this.fb.group({
      bio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());
    this.addressForm
      .get('country')!
      .valueChanges.subscribe((selectedCountry) => {
        if (selectedCountry) {
          this.store.dispatch(
            CityActions.loadCities({ country: selectedCountry })
          );
        }
      });
    this.store
      .select((state) => state.countries.countries)
      .subscribe((countries) => (this.filteredCountries = countries));
    this.store
      .select((state) => state.cities.cities)
      .subscribe((cities) => (this.filteredCitiesList = cities));
    this.store
      .select((state) => state.cities.loading)
      .subscribe((loading) => (this.citiesLoading = loading));
    this.cityFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map((search: string) => {
          if (!search) {
            return this.filteredCitiesList;
          }
          return this.filteredCitiesList.filter((city) =>
            city.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
      .subscribe((filtered) => (this.filteredCitiesList = filtered));
  }

  imageFileValidator(
    control: AbstractControl
  ): { [key: string]: unknown } | null {
    const file = control.value;
    if (!file) return null;
    if (!file.type || !file.type.startsWith('image/')) {
      return { notImage: true };
    }
    const forbiddenExtensions = [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
    ];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext && forbiddenExtensions.includes(ext)) {
      return { forbiddenFileType: true };
    }
    return null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const forbiddenExtensions = [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
    ];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (
      !file.type.startsWith('image/') ||
      (ext && forbiddenExtensions.includes(ext))
    ) {
      this.imageSrc = null;
      return;
    }
    this.userDataForm.patchValue({ image: file });
    this.userDataForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
