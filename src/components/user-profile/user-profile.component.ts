import { Component, OnInit } from '@angular/core';
import {
  AddressDto,
  ClientProfileDto,
  ForeignLanguageDto,
  FreelancerProfileDto,
  Role,
  SkillDto,
} from '../../models/UserProfile';
import { Store } from '@ngrx/store';
import { ClientProfileState } from '../../store/reducers/clientprofile.reducers';
import { RoleService } from '../../services/role.service';
import { FreelancersState } from '../../store/reducers/freelancerprofile.reducers';
import { NgIf } from '@angular/common';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import {
  ClientProfileData,
  FreelancerDetailsData,
  FreelancerProfileData,
  UserDetailsData,
} from '../../models/Ui';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [NgIf, ClientProfileComponent, FreelancerProfileComponent],
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  freelancerProfileData!: FreelancerProfileData;
  clientProfileData!: ClientProfileData;
  clientProfile!: ClientProfileDto;
  freelancerProfile!: FreelancerProfileDto;
  role!: Role;
  skills!: SkillDto[];
  foreignLanguages!: ForeignLanguageDto[];
  constructor(
    private store: Store<{
      clientProfile: ClientProfileState;
      freelancerProfile: FreelancersState;
    }>,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.role$.subscribe((role) => {
      if (role) {
        this.role = role;
        if (role === 'Client') {
          this.store
            .select((state) => state.clientProfile.clientProfiles)
            .subscribe((profiles) => {
              this.clientProfile = profiles[0];
              this.clientProfileData = {
                address: this.clientProfile.address,
                bio: this.clientProfile.bio,
                image: this.clientProfile.image,
              };
            });
        } else if (role === 'Freelancer') {
          this.store
            .select((state) => state.freelancerProfile.freelancerProfiles)
            .subscribe((profiles) => {
              this.freelancerProfile = profiles[0];
              this.freelancerProfileData = {
                address: this.freelancerProfile.address,
                bio: this.freelancerProfile.bio,
                image: this.freelancerProfile.image,
                programmingLanguages: this.freelancerProfile.skills.map(
                  (skill: SkillDto) => skill.programmingLanguage
                ),
                areas: this.freelancerProfile.skills.map(
                  (skill: SkillDto) => skill.area
                ),
                foreignLanguages: this.freelancerProfile.foreignLanguages.map(
                  (lang) => lang.language
                ),
                experience: this.freelancerProfile.experience,
                currency: this.freelancerProfile.currency,
                rate: this.freelancerProfile.rate,
                portfolioUrl: this.freelancerProfile.portfolioUrl,
              };
            });
        }
      }
    });
  }
  onAddressChanged(address: AddressDto) {
    if (this.role === 'Client') {
      this.clientProfile.address = address;
    } else if (this.role === 'Freelancer') {
      this.freelancerProfile.address = address;
    }
  }

  onUserDataChanges(userDetails: UserDetailsData) {
    if (this.role === 'Freelancer') {
      this.freelancerProfile.bio = userDetails.bio;
      this.freelancerProfile.image = userDetails.image;
    } else if (this.role === 'Client') {
      this.clientProfile.bio = userDetails.bio;
      this.clientProfile.image = userDetails.image;
    }
  }

  onFreelancerDataChanged(freelancerDetails: FreelancerDetailsData) {
    for (let i = 0; i < freelancerDetails.programmingLanguages.length; i++) {
      const skill: SkillDto = {
        programmingLanguage: freelancerDetails.programmingLanguages[i],
        area: freelancerDetails.areas[i],
      };
      this.freelancerProfile.skills.push(skill);
    }

    for (let i = 0; i < freelancerDetails.foreignLanguages.length; i++) {
      const language: ForeignLanguageDto = {
        language: freelancerDetails.foreignLanguages[i],
      };
      this.freelancerProfile.foreignLanguages.push(language);
    }
    this.freelancerProfile.experience = freelancerDetails.experience;
    this.freelancerProfile.rate = freelancerDetails.rate;
    this.freelancerProfile.portfolioUrl = freelancerDetails.portfolioUrl;
  }
}
