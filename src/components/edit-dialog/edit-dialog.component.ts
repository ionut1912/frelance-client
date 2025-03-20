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
import { DialogData } from '../../models/Ui';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { FreelancerProfileFormComponent } from '../freelancer-profile-form/freelancer-profile-form.component';

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
      this.dialogRef.close(this.addressForm.value);
    }
    if (this.userDataForm.valid) {
      this.dialogRef.close(this.userDataForm.value);
    }
    if (this.freelancerProfileForm.valid) {
      this.dialogRef.close(this.freelancerProfileForm.value);
    }
  }
}
