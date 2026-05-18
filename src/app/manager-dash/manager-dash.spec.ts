import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDash } from './manager-dash';

describe('ManagerDash', () => {
  let component: ManagerDash;
  let fixture: ComponentFixture<ManagerDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
