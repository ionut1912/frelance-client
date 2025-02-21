import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import {
  MatStep,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  CreateFreelancerProfileRequest,
  FreelancerProfileDto,
  SkillDto,
} from '../../models/UserProfile';
import { Country, Language } from '../../models/ExternalApis';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import * as FreelancerProfileActions from '../../store/actions/freelancerprofile.actions';
import * as CountryActions from '../../store/actions/country.actions';
import * as CityActions from '../../store/actions/city.actions';
import * as LanguageActions from '../../store/actions/language.actions';
import * as SkillsActions from '../../store/actions/skills.actions';
import { LanguageState } from '../../store/reducers/lanuguage.reducer';
import { SkillsState } from '../../store/reducers/skills.reducers';
import { FreelancersState } from '../../store/reducers/freelancerprofile.reducers';

@Component({
  selector: 'app-frelancer-page',
  imports: [
    AsyncPipe,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatStep,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NavbarComponent,
    NgForOf,
    NgIf,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
  ],
  templateUrl: './frelancer-page.component.html',
  styleUrls: ['./frelancer-page.component.scss'],
})
export class FrelancerPageComponent implements OnInit {
  freelancerProfile$: Observable<FreelancerProfileDto | null>;
  countries$: Observable<Country[]>;
  cities$: Observable<string[]>;
  citiesLoading$: Observable<boolean>;
  freelancerProfileLanguages$: Observable<Language[]>;
  freelancerLanguagesLoading$: Observable<boolean>;
  freelancerProfileSkills$: Observable<SkillDto[]>;
  uniqueAreas$: Observable<string[]>;

  addressForm: FormGroup = new FormGroup({});
  userDataForm: FormGroup = new FormGroup({});
  freelancerProfileForm: FormGroup = new FormGroup({});

  countryFilterCtrl: FormControl = new FormControl();
  cityFilterCtrl: FormControl = new FormControl();
  foreignLanguageFilterCtrl: FormControl = new FormControl();

  allCountries: Country[] = [];
  filteredCountries: Country[] = [];
  allCitiesList: string[] = [];
  filteredCitiesList: string[] = [];

  filteredForeignLanguages$!: Observable<Language[]>;

  imageSrc: string | null = null;
  profileLoaded = false;

  constructor(
    private store: Store<{
      freelancerProfile: FreelancersState;
      countries: CountryState;
      cities: CityState;
      languages: LanguageState;
      skills: SkillsState;
    }>,
    private fb: FormBuilder
  ) {
    this.freelancerProfile$ = this.store.select(
      (state) => state.freelancerProfile.freelancerProfile
    );
    this.countries$ = this.store.select((state) => state.countries.countries);
    this.cities$ = this.store.select((state) => state.cities.cities);
    this.citiesLoading$ = this.store.select((state) => state.cities.loading);
    this.freelancerProfileLanguages$ = this.store.select(
      (state) => state.languages.languages
    );
    this.freelancerLanguagesLoading$ = this.store.select(
      (state) => state.languages.loading
    );
    this.freelancerProfileSkills$ = this.store.select(
      (state) => state.skills.skills
    );

    this.uniqueAreas$ = this.freelancerProfileSkills$.pipe(
      map((skills) => {
        if (!skills) return [];
        return skills
          .map((skill) => skill.area)
          .filter((area, index, self) => self.indexOf(area) === index);
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(FreelancerProfileActions.getCurrentFreelancerProfile());
    this.store.dispatch(CountryActions.loadCountries());
    this.freelancerProfile$.subscribe(() => {
      this.profileLoaded = true;
    });

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
    this.freelancerProfileForm = this.fb.group({
      programmingLanguages: ['', Validators.required],
      areas: ['', Validators.required],
      foreignLanguages: ['', Validators.required],
      experience: ['', Validators.required],
      rate: ['', Validators.required],
      currency: ['', Validators.required],
      rating: ['', Validators.required],
      portfolioUrl: ['', Validators.required],
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
    this.store.dispatch(LanguageActions.loadLanguages());
    this.store.dispatch(SkillsActions.getSkills());
    this.filteredForeignLanguages$ = combineLatest([
      this.freelancerProfileLanguages$,
      this.foreignLanguageFilterCtrl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([languages, search]) => {
        if (!search) return languages;
        return languages.filter((language) =>
          language.name.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
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
    const payload: CreateFreelancerProfileRequest = {
      addressCountry: this.addressForm.value.country.name.common,
      addressStreet: this.addressForm.value.street,
      addressStreetNumber: this.addressForm.value.streetNumber,
      addressCity: this.addressForm.value.city,
      addressZip: this.addressForm.value.zipCode,
      bio: this.userDataForm.value.bio,
      image: this.imageSrc!,
      programmingLanguages:
        this.freelancerProfileForm.value.programmingLanguages,
      areas: this.freelancerProfileForm.value.areas,
      foreignLanguages: this.freelancerProfileForm.value.foreignLanguages,
      experience: this.freelancerProfileForm.value.experience,
      rate: this.freelancerProfileForm.value.rate,
      currency: this.freelancerProfileForm.value.currency,
      rating: this.freelancerProfileForm.value.rating,
      portfolioUrl: this.freelancerProfileForm.value.portfolioUrl,
    };
    this.store.dispatch(
      FreelancerProfileActions.createFreelancerProfile({ payload })
    );
  }
}
