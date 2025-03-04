import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPhotoComponent } from './verify-photo.component';

describe('VerifyPhotoComponent', () => {
  let component: VerifyPhotoComponent;
  let fixture: ComponentFixture<VerifyPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPhotoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
