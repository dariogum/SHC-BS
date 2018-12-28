import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBackgroundComponent } from './patient-background.component';

describe('PatientBackgroundComponent', () => {
  let component: PatientBackgroundComponent;
  let fixture: ComponentFixture<PatientBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
