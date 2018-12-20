import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApplicationFormComponent } from './vaccine-application-form.component';

describe('VaccineApplicationFormComponent', () => {
  let component: VaccineApplicationFormComponent;
  let fixture: ComponentFixture<VaccineApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
