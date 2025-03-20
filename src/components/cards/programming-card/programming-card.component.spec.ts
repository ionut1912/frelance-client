import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingCardComponent } from './programming-card.component';

describe('ProgrammingCardComponent', () => {
  let component: ProgrammingCardComponent;
  let fixture: ComponentFixture<ProgrammingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
