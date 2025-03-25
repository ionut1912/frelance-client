import { Component, OnInit } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CreateFreelancerProfileRequest } from '../../models/UserProfile';
import { Language } from '../../models/ExternalApis';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import { LanguageState } from '../../store/reducers/lanuguage.reducer';
import { SkillsState } from '../../store/reducers/skills.reducers';
import { AddressFormComponent } from '../address-form/address-form.component';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { BaseProfilePageComponent } from '../base-profille/base-profile-page.component';
import { FreelancerProfileFormComponent } from '../freelancer-profile-form/freelancer-profile-form.component';
import { VerifyPhotoComponent } from '../verify-photo/verify-photo.component';
import { UserProfileState } from '../../store/reducers/userprofile.reducers';
import * as UserProfileActions from '../../store/actions/userprofile.actions';

@Component({
  selector: 'app-freelancer-page',
  templateUrl: './freelancer-page.component.html',
  styleUrls: ['./freelancer-page.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatStep,
    MatStepper,
    NgIf,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    AddressFormComponent,
    UserDataFormComponent,
    FreelancerProfileFormComponent,
    VerifyPhotoComponent,
  ],
})
export class FreelancerPageComponent
  extends BaseProfilePageComponent
  implements OnInit
{
  constructor(
    protected override store: Store<{
      userProfile: UserProfileState;
      countries: CountryState;
      cities: CityState;
      languages: LanguageState;
      skills: SkillsState;
    }>,
    protected override fb: FormBuilder
  ) {
    super(fb, store);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  completeStepper(): void {
    const payload: CreateFreelancerProfileRequest = {
      addressCountry: this.addressForm.value.country.name.common,
      addressStreet: this.addressForm.value.street,
      addressStreetNumber: this.addressForm.value.streetNumber,
      addressCity: this.addressForm.value.city,
      addressZip: this.addressForm.value.zipCode,
      bio: this.userDataForm.value.bio,
      image: this.userDataForm.value.profileImage,
      programmingLanguages:
        this.freelancerProfileForm.value.programmingLanguages,
      areas: this.freelancerProfileForm.value.areas,
      foreignLanguages: this.freelancerProfileForm.value.foreignLanguages.map(
        (language: Language) => language.name
      ),
      experience: this.freelancerProfileForm.value.experience,
      rate: this.freelancerProfileForm.value.rate,
      currency: this.freelancerProfileForm.value.currency,
      portfolioUrl: this.freelancerProfileForm.value.portfolioUrl,
    };
    this.store.dispatch(
      UserProfileActions.createFreelancerProfile({ payload })
    );
  }
}
