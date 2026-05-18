import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlan } from './training-plan';

describe('TrainingPlan', () => {
  let component: TrainingPlan;
  let fixture: ComponentFixture<TrainingPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
