import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDash } from './mentee-dash';

describe('MenteeDash', () => {
  let component: MenteeDash;
  let fixture: ComponentFixture<MenteeDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenteeDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenteeDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
