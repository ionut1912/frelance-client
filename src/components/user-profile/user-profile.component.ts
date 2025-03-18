import { Component, OnInit } from '@angular/core';
import { ClientProfileDto, FreelancerProfileDto } from '../../models/UserProfile';
import { Store } from '@ngrx/store';
import { ClientProfileState } from '../../store/reducers/clientprofile.reducers';
import { RoleService } from '../../services/role.service';
import { FreelancersState } from '../../store/reducers/freelancerprofile.reducers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [],
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profile!: ClientProfileDto | FreelancerProfileDto;

  constructor(private store: Store<{ clientProfile: ClientProfileState,freelancerProfile:FreelancersState }>, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.role$.subscribe((role) => {
      if(role) {
        if (role==="Client") {
          this.store
            .select((state) => state.clientProfile.clientProfiles)
            .subscribe((profiles) => {
              this.profile = profiles[0];
            });

        }else if(role==="Freelancer") {
          this.store
            .select((state) => state.freelancerProfile.freelancerProfiles)
            .subscribe((profiles) => {
              this.profile = profiles[0];
            });
        }
      }

    });
  }
}
