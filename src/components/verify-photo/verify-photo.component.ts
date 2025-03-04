import { Component, Input } from '@angular/core';
import {
  ClientProfileDto,
  FreelancerProfileDto,
  Role,
  VerifyFacePayload,
} from '../../models/UserProfile';
import { Store } from '@ngrx/store';
import { FaceVerificationState } from '../../store/reducers/faceverification.reducers';
import * as FaceVerificationActions from '../../store/actions/faceverification.actions';
import { NgIf } from '@angular/common';
import { CameraCaptureComponent } from '../canera-capture/camera-capture.component';

@Component({
  selector: 'app-verify-photo',
  templateUrl: './verify-photo.component.html',
  imports: [NgIf, CameraCaptureComponent],
  styleUrls: ['./verify-photo.component.scss'],
})
export class VerifyPhotoComponent {
  isVerified: boolean = false;
  base64Image: string = '';

  @Input() profile: FreelancerProfileDto | ClientProfileDto | null | undefined =
    undefined;
  @Input() role!: Role;

  constructor(private store: Store<{ verifyFace: FaceVerificationState }>) {}

  verify(): void {
    this.isVerified = true;
  }

  onImageCaptured(image: string): void {
    this.base64Image = image;
  }

  verifyImage(): void {
    if (!this.profile) return;
    const payload: VerifyFacePayload = {
      faceVerificationRequest: {
        faceBase64Image: this.base64Image,
      },
      profile: this.profile,
      role: this.role,
    };
    this.store.dispatch(FaceVerificationActions.verifyFace({ payload }));
  }
}
