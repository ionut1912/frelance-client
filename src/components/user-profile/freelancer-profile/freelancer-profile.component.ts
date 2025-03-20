import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressDto } from '../../../models/UserProfile';
import { AddressCardComponent } from '../../cards/address-card/address-card.component';
import { UserDataCardComponent } from '../../cards/user-data-card/user-data-card.component';
import { ProgrammingCardComponent } from '../../cards/programming-card/programming-card.component';
import {
  FreelancerDetailsData,
  FreelancerProfileData,
  UserDetailsData,
} from '../../../models/Ui';

@Component({
  selector: 'app-freelancer-profile',
  imports: [
    AddressCardComponent,
    UserDataCardComponent,
    ProgrammingCardComponent,
  ],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.scss',
})
export class FreelancerProfileComponent implements OnInit {
  @Input() profile!: FreelancerProfileData;
  @Output() addressChanged = new EventEmitter<AddressDto>();
  @Output() userDataChanged = new EventEmitter<UserDetailsData>();
  @Output() freelancerDataChanged = new EventEmitter<FreelancerDetailsData>();
  programmingData!: FreelancerDetailsData;
  ngOnInit() {
    this.programmingData = {
      programmingLanguages: this.profile.programmingLanguages,
      areas: this.profile.areas,
      foreignLanguages: this.profile.foreignLanguages,
      experience: this.profile.experience,
      rate: this.profile.rate,
      currency: this.profile.currency,
      portfolioUrl: this.profile.portfolioUrl,
    };
  }
  onAddressChanged(address: AddressDto) {
    this.addressChanged.emit(address);
  }

  onUserDetailsChanged(userDetailsData: UserDetailsData) {
    this.userDataChanged.emit(userDetailsData);
  }

  onFreelancerDataChanged(freelancerData: FreelancerDetailsData) {
    this.freelancerDataChanged.emit(freelancerData);
  }
}
