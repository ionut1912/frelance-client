import { Directive, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Country, Language } from '../../models/ExternalApis';
import * as CountryActions from '../../store/actions/country.actions';
import * as CityActions from '../../store/actions/city.actions';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import { map, startWith } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { FreelancerProfileDto, SkillDto } from '../../models/UserProfile';
import * as LanguageActions from '../../store/actions/language.actions';
import * as SkillsActions from '../../store/actions/skills.actions';
import { LanguageState } from '../../store/reducers/lanuguage.reducer';
import { SkillsState } from '../../store/reducers/skills.reducers';
import { UserProfileState } from '../../store/reducers/userprofile.reducers';
import * as UserActions from '../../store/actions/userprofile.actions';

export interface BaseStore {
  countries: CountryState;
  cities: CityState;
  userProfile: UserProfileState;
  languages: LanguageState;
  skills: SkillsState;
}

@Directive()
export abstract class BaseProfilePageComponent implements OnInit {
  addressForm: FormGroup;
  userDataForm: FormGroup;
  freelancerProfileForm: FormGroup;
  countryFilterCtrl: FormControl = new FormControl('');
  cityFilterCtrl: FormControl = new FormControl('');
  filteredCountries: Country[] = [];
  filteredCitiesList: string[] = [];
  fullCountries: Country[] = [];
  fullCities: string[] = [];
  imageSrc: string | null = null;
  citiesLoading: boolean = false;
  foreignLanguageFilterCtrl: FormControl = new FormControl('');
  filteredForeignLanguages$!: Observable<Language[]>;
  freelancerProfileLanguages$: Observable<Language[]>;
  freelancerLanguagesLoading$: Observable<boolean>;
  freelancerProfile$: Observable<FreelancerProfileDto[]>;
  freelancerProfileSkills$: Observable<SkillDto[]>;
  uniqueAreas$: Observable<string[]>;
  profile: FreelancerProfileDto | null | undefined = undefined;

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
    this.freelancerProfileForm = this.fb.group({
      programmingLanguages: ['', Validators.required],
      areas: ['', Validators.required],
      foreignLanguages: ['', Validators.required],
      experience: ['', Validators.required],
      rate: ['', Validators.required],
      currency: ['', Validators.required],
      portfolioUrl: ['', Validators.required],
    });
    this.freelancerProfile$ = this.store.select(
      (state) => state.userProfile.freelancerProfiles!
    );
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

  setImage(image: string): void {
    this.imageSrc = image;
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
    this.store.dispatch(UserActions.getCurrentUserProfile());
    this.store.dispatch(LanguageActions.loadLanguages());
    this.store.dispatch(SkillsActions.getSkills());
    this.freelancerProfile$.subscribe((val) => (this.profile = val[0]));
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
    this.uniqueAreas$ = this.freelancerProfileSkills$.pipe(
      map((skills) =>
        skills
          ? skills
              .map((s) => s.area)
              .filter((area, i, arr) => arr.indexOf(area) === i)
          : []
      )
    );
  }
}
