import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as ClientProfileActions from '../../store/actions/clienprofile.actions';
import * as CountryActions from '../../store/actions/country.actions';
import * as CityActions from '../../store/actions/city.actions';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  MatStep,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ClientProfileState } from '../../store/reducers/clientprofile.reducers';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Country } from '../../models/ExternalApis';
import {
  ClientProfileDto,
  CreateClientProfileRequest,
} from '../../models/UserProfile';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    NavbarComponent,
    MatStepper,
    NgIf,
    AsyncPipe,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatError,
    NgTemplateOutlet,
  ],
  styleUrls: ['./client-page.component.css'],
})
export class ClientPageComponent implements OnInit {
  clientProfile$: Observable<ClientProfileDto | null | undefined>;
  countries$: Observable<Country[]>;
  cities$: Observable<string[]>;
  citiesLoading$: Observable<boolean>;
  addressForm: FormGroup = new FormGroup({});
  userDataForm: FormGroup = new FormGroup({});
  countryFilterCtrl: FormControl = new FormControl();
  cityFilterCtrl: FormControl = new FormControl();
  allCountries: Country[] = [];
  filteredCountries: Country[] = [];
  allCitiesList: string[] = [];
  filteredCitiesList: string[] = [];
  imageSrc: string | null = null;
  profileLoaded = false;
  profile: ClientProfileDto | null | undefined = undefined;
  constructor(
    private store: Store<{
      clientProfile: ClientProfileState;
      countries: CountryState;
      cities: CityState;
    }>,
    private fb: FormBuilder
  ) {
    this.clientProfile$ = this.store.select(
      (state) => state.clientProfile.clientProfile
    );
    this.countries$ = this.store.select((state) => state.countries.countries);
    this.cities$ = this.store.select((state) => state.cities.cities);
    this.citiesLoading$ = this.store.select((state) => state.cities.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(ClientProfileActions.getCurrentClientProfile());
    this.store.dispatch(CountryActions.loadCountries());

    this.store
      .select((state) => state.clientProfile.clientProfile)
      .subscribe((val) => (this.profile = val));

    this.countries$.subscribe((countries) => {
      this.allCountries = countries;
      this.filteredCountries = countries;
    });
    this.countryFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map((search) => {
          if (!search) return this.allCountries;
          return this.allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
      .subscribe((filtered) => {
        this.filteredCountries = filtered;
      });

    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.userDataForm = this.fb.group({
      bio: ['', Validators.required],
      image: [null, [Validators.required, this.imageFileValidator.bind(this)]],
    });

    this.addressForm
      .get('country')!
      .valueChanges.subscribe((selectedCountry) => {
        if (selectedCountry) {
          this.store.dispatch(
            CityActions.loadCities({ country: selectedCountry })
          );
        }
      });
    this.cities$.subscribe((cities) => {
      this.allCitiesList = cities;
      this.filteredCitiesList = cities;
    });
    this.cityFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map((search) => {
          if (!search) return this.allCitiesList;
          return this.allCitiesList.filter((city) =>
            city.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
      .subscribe((filtered) => {
        this.filteredCitiesList = filtered;
      });
  }

  imageFileValidator(control: FormControl): { [key: string]: any } | null {
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
    const ext = file.name.split('.').pop().toLowerCase();
    if (forbiddenExtensions.includes(ext)) {
      return { forbiddenFileType: true };
    }
    return null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const forbiddenExtensions = [
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
      ];
      const ext = file.name.split('.').pop().toLowerCase();
      if (
        !file.type.startsWith('image/') ||
        forbiddenExtensions.includes(ext)
      ) {
        this.userDataForm.get('image')!.setErrors({ forbiddenFileType: true });
        this.imageSrc = null;
        return;
      }
      this.userDataForm.patchValue({ image: file });
      this.userDataForm.get('image')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  completeStepper(): void {
    const payload: CreateClientProfileRequest = {
      addressCountry: this.addressForm.value.country.name.common,
      addressStreet: this.addressForm.value.street,
      addressStreetNumber: this.addressForm.value.streetNumber,
      addressCity: this.addressForm.value.city,
      addressZip: this.addressForm.value.zipCode,
      bio: this.userDataForm.value.bio,
      image: this.imageSrc!,
    };
    this.store.dispatch(ClientProfileActions.createClientProfile({ payload }));
  }
}
