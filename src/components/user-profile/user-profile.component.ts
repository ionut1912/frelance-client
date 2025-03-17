import { Component, OnInit } from '@angular/core';
import { ClientProfileDto } from '../../models/UserProfile';
import { Store } from '@ngrx/store';
import { ClientProfileState } from '../../store/reducers/clientprofile.reducers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [],
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profile!: ClientProfileDto;

  constructor(private store: Store<{ clientProfile: ClientProfileState }>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.clientProfile.clientProfiles)
      .subscribe((profiles) => {
        this.profile = profiles[0];
      });
  }
}
