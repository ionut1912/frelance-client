import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { from, Subscription } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  imports: [MatProgressSpinner, NgIf],
  styleUrls: ['./camera-capture.component.scss'],
})
export class CameraCaptureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;
  @Output() imageCaptured = new EventEmitter<string>();
  base64Image: string = '';
  isCameraLoading: boolean = false;
  stream: MediaStream | null = null;
  streamSub?: Subscription;

  ngAfterViewInit(): void {
    this.initializeCamera();
  }

  initializeCamera(): void {
    if (this.video) {
      const videoElement = this.video.nativeElement;
      this.isCameraLoading = true;
      this.streamSub = from(
        navigator.mediaDevices.getUserMedia({ video: true })
      ).subscribe((stream) => {
        this.stream = stream;
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
          videoElement.play().then(() => {});
          this.isCameraLoading = false;
        };
      });
    }
  }

  capture(): void {
    if (!this.video) return;
    const videoEl = this.video.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    canvas
      .getContext('2d')!
      .drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    this.base64Image = canvas.toDataURL('image/png');
    this.stopStream();
    this.imageCaptured.emit(this.base64Image);
  }

  retake(): void {
    this.base64Image = '';
    this.initializeCamera();
  }

  stopStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.streamSub?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopStream();
  }
}
