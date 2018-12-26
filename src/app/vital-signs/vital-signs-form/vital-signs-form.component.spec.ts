import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsFormComponent } from './vital-signs-form.component';

describe('VitalSignsFormComponent', () => {
  let component: VitalSignsFormComponent;
  let fixture: ComponentFixture<VitalSignsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalSignsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalSignsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
