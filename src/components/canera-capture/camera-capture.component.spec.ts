import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraCaptureComponent } from './camera-capture.component';

describe('CaneraCaptureComponent', () => {
  let component: CameraCaptureComponent;
  let fixture: ComponentFixture<CameraCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraCaptureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
