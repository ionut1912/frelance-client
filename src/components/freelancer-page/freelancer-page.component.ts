import { Component, OnInit } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatStep, MatStepper } from '@angular/material/stepper';
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
import { Language } from '../../models/ExternalApis';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import * as FreelancerProfileActions from '../../store/actions/freelancerprofile.actions';
import * as LanguageActions from '../../store/actions/language.actions';
import * as SkillsActions from '../../store/actions/skills.actions';
import { LanguageState } from '../../store/reducers/lanuguage.reducer';
import { SkillsState } from '../../store/reducers/skills.reducers';
import { FreelancersState } from '../../store/reducers/freelancerprofile.reducers';
import { AddressFormComponent } from '../address-form/address-form.component';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { BaseProfilePageComponent } from '../base-profille/base-profile-page.component';
import { FreelancerProfileFormComponent } from '../freelancer-profile-form/freelancer-profile-form.component';
import { VerifyPhotoComponent } from '../verify-photo/verify-photo.component';

@Component({
  selector: 'app-freelancer-page',
  imports: [
    MatProgressSpinner,
    MatStep,
    MatStepper,
    NavbarComponent,
    NgIf,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    AddressFormComponent,
    UserDataFormComponent,
    FreelancerProfileFormComponent,
    VerifyPhotoComponent,
    AddressFormComponent,
  ],
  templateUrl: './freelancer-page.component.html',
  styleUrls: ['./freelancer-page.component.scss'],
})
export class FreelancerPageComponent
  extends BaseProfilePageComponent
  implements OnInit
{
  freelancerProfile$: Observable<FreelancerProfileDto | null | undefined>;
  freelancerProfileForm: FormGroup;
  foreignLanguageFilterCtrl: FormControl = new FormControl('');
  filteredForeignLanguages$!: Observable<Language[]>;
  freelancerProfileLanguages$: Observable<Language[]>;
  freelancerLanguagesLoading$: Observable<boolean>;
  freelancerProfileSkills$: Observable<SkillDto[]>;
  uniqueAreas$: Observable<string[]>;
  profile: FreelancerProfileDto | null | undefined = undefined;
  links = [
    { label: 'My Profile', url: '/user-profile' },
    { label: 'Projects', url: '/projects' },
    { label: 'Invoices', url: '/invoices' },
    { label: 'Contracts:', url: '/cotracts' },
    { label: 'Proposals:', url: '/proposals' },
  ];
  constructor(
    protected override store: Store<{
      freelancerProfile: FreelancersState;
      countries: CountryState;
      cities: CityState;
      languages: LanguageState;
      skills: SkillsState;
    }>,
    protected override fb: FormBuilder
  ) {
    super(fb, store as Store<{ countries: CountryState; cities: CityState }>);
    this.freelancerProfile$ = this.store.select(
      (state) => state.freelancerProfile.freelancerProfile
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
    this.uniqueAreas$ = this.freelancerProfileSkills$.pipe(
      map((skills) => {
        if (!skills) return [];
        return skills
          .map((skill) => skill.area)
          .filter((area, index, self) => self.indexOf(area) === index);
      })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(FreelancerProfileActions.getCurrentFreelancerProfile());
    this.store.dispatch(LanguageActions.loadLanguages());
    this.store.dispatch(SkillsActions.getSkills());
    this.freelancerProfile$.subscribe((val) => (this.profile = val));
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

  setImage(image: string): void {
    this.imageSrc = image;
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
