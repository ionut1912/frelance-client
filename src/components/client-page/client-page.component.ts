import { Component, OnInit } from '@angular/core';
import { BaseProfilePageComponent } from '../base-profille/base-profile-page.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import { ClientProfileDto } from '../../models/UserProfile';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { AddressFormComponent } from '../address-form/address-form.component';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { VerifyPhotoComponent } from '../verify-photo/verify-photo.component';
import { LanguageState } from '../../store/reducers/lanuguage.reducer';
import { SkillsState } from '../../store/reducers/skills.reducers';
import { UserProfileState } from '../../store/reducers/userprofile.reducers';
import * as UserProfileActions from '../../store/actions/userprofile.actions';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  imports: [
    NgIf,
    NgTemplateOutlet,
    MatStepper,
    MatStep,
    AddressFormComponent,
    UserDataFormComponent,
    MatProgressSpinner,
    VerifyPhotoComponent,
  ],
})
export class ClientPageComponent
  extends BaseProfilePageComponent
  implements OnInit
{
  clientProfile: ClientProfileDto | null | undefined = undefined;
  constructor(
    protected override fb: FormBuilder,
    protected override store: Store<{
      countries: CountryState;
      cities: CityState;
      userProfile: UserProfileState;
      languages: LanguageState;
      skills: SkillsState;
    }>
  ) {
    super(fb, store);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(UserProfileActions.getCurrentUserProfile());
    this.store
      .select((state) => state.userProfile.clientProfiles)
      .subscribe((profile) => (this.clientProfile = profile![0]));
  }

  completeStepper(): void {
    const payload = {
      addressCountry: this.addressForm.value.country.name.common,
      addressStreet: this.addressForm.value.street,
      addressStreetNumber: this.addressForm.value.streetNumber,
      addressCity: this.addressForm.value.city,
      addressZip: this.addressForm.value.zipCode,
      bio: this.userDataForm.value.bio,
      image: this.imageSrc!,
    };
    this.store.dispatch(UserProfileActions.createClientProfile({ payload }));
  }
}
