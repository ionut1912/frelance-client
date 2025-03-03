import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordLegendComponent } from './password-legend.component';

describe('PasswordLegendComponent', () => {
  let component: PasswordLegendComponent;
  let fixture: ComponentFixture<PasswordLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
