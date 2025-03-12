import { Component, OnInit } from '@angular/core';
import { BaseProfilePageComponent } from '../base-profille/base-profile-page.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClientProfileState } from '../../store/reducers/clientprofile.reducers';
import { CountryState } from '../../store/reducers/country.reducers';
import { CityState } from '../../store/reducers/city.reducers';
import * as ClientProfileActions from '../../store/actions/clientprofile.actions';
import { ClientProfileDto } from '../../models/UserProfile';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { AddressFormComponent } from '../address-form/address-form.component';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { VerifyPhotoComponent } from '../verify-photo/verify-photo.component';
@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  imports: [
    NavbarComponent,
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
  profile: ClientProfileDto | null | undefined = undefined;
  links = [
    { label: 'My Profile', url: '/user-profile' },
    { label: 'My Projects', url: '/projects' },
    { label: 'My Invoices', url: '/invoices' },
    { label: 'My Contracts', url: '/cotracts' },
    { label: 'My Proposals', url: '/proposals' },
    { label: 'Project Board', url: '/board' },
  ];
  constructor(
    protected override fb: FormBuilder,
    protected override store: Store<{
      clientProfile: ClientProfileState;
      countries: CountryState;
      cities: CityState;
    }>
  ) {
    super(fb, store);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(ClientProfileActions.getCurrentClientProfile());
    this.store
      .select((state) => state.clientProfile.clientProfiles)
      .subscribe((profile) => (this.profile = profile[0]));
  }

  setImage(image: string): void {
    this.imageSrc = image;
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
    this.store.dispatch(ClientProfileActions.createClientProfile({ payload }));
  }
}
