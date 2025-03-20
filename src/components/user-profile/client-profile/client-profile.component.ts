import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressCardComponent } from '../../cards/address-card/address-card.component';
import { UserDataCardComponent } from '../../cards/user-data-card/user-data-card.component';
import { ClientProfileData, UserDetailsData } from '../../../models/Ui';
import { AddressDto } from '../../../models/UserProfile';

@Component({
  selector: 'app-client-profile',
  imports: [AddressCardComponent, UserDataCardComponent],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent {
  @Input() profile!: ClientProfileData;
  @Output() addressChanged = new EventEmitter<AddressDto>();
  @Output() userDataChanged = new EventEmitter<UserDetailsData>();

  onAddressChanged(address: AddressDto) {
    this.addressChanged.emit(address);
  }

  onUserDetailsChanged(userDetailsData: UserDetailsData) {
    this.userDataChanged.emit(userDetailsData);
  }
}
