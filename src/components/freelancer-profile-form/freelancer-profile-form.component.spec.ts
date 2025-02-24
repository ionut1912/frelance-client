import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProfileFormComponent } from './freelancer-profile-form.component';

describe('FreelancerProfileFormComponent', () => {
  let component: FreelancerProfileFormComponent;
  let fixture: ComponentFixture<FreelancerProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
