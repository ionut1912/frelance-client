import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AddressFormComponent } from '../address-form/address-form.component';
import { NgIf } from '@angular/common';
import {
  BaseProfilePageComponent,
  BaseStore,
} from '../base-profille/base-profile-page.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  DialogData,
  FreelancerDetailsData,
  UserDetailsData,
} from '../../models/Ui';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { FreelancerProfileFormComponent } from '../freelancer-profile-form/freelancer-profile-form.component';
import * as UserProfileActions from '../../store/actions/userprofile.actions';
import { AddressDto } from '../../models/UserProfile';
import { Language } from '../../models/ExternalApis';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    AddressFormComponent,
    NgIf,
    UserDataFormComponent,
    FreelancerProfileFormComponent,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent extends BaseProfilePageComponent {
  constructor(
    protected override fb: FormBuilder,
    protected override store: Store<BaseStore>,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super(fb, store);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.data.address) {
      this.addressForm.patchValue(this.data.address);
    }
    if (this.data.userDetails) {
      this.userDataForm.patchValue(this.data.userDetails);
    }
    if (this.data.freelancerData) {
      this.freelancerProfileForm.patchValue(this.data.freelancerData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      const addressDto: AddressDto = {
        id: this.data.address?.id!,
        country: this.addressForm.value.country.name.common,
        city: this.addressForm.value.city,
        street: this.addressForm.value.street,
        streetNumber: this.addressForm.value.streetNumber,
        zipCode: this.addressForm.value.zipCode,
      };
      console.log(addressDto);
      this.dialogRef.close(addressDto);
      this.store.dispatch(
        UserProfileActions.patchUserProfileAddress({
          id: this.data.userProfileId,
          payload: addressDto,
        })
      );
    }
    if (this.userDataForm.valid) {
      const userDetailsData: UserDetailsData = {
        bio: this.userDataForm.value.bio,
        image: this.imageSrc!,
      };
      console.log(userDetailsData);
      this.dialogRef.close(userDetailsData);
      this.store.dispatch(
        UserProfileActions.patchUserProfileDetails({
          id: this.data.userProfileId,
          payload: userDetailsData,
        })
      );
    }
    if (this.freelancerProfileForm.valid) {
      const freelancerProfileData: FreelancerDetailsData = {
        programmingLanguages:
          this.freelancerProfileForm.value.programmingLanguages,
        areas: this.freelancerProfileForm.value.areas,
        foreignLanguages: this.freelancerProfileForm.value.foreignLanguages.map(
          (lang: Language) => lang.name
        ),
        experience: this.freelancerProfileForm.value.experience,
        rate: this.freelancerProfileForm.value.rate,
        currency: this.freelancerProfileForm.value.currency,
        portfolioUrl: this.freelancerProfileForm.value.portfolioUrl,
      };
      this.dialogRef.close(freelancerProfileData);
      this.store.dispatch(
        UserProfileActions.patchFreelancerProfileDetails({
          id: this.data.userProfileId,
          payload: freelancerProfileData,
        })
      );
    }
  }
}
