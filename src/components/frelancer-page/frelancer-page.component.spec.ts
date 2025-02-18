import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrelancerPageComponent } from './frelancer-page.component';

describe('FrelancerPageComponent', () => {
  let component: FrelancerPageComponent;
  let fixture: ComponentFixture<FrelancerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrelancerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrelancerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
