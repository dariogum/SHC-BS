import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsListComponent } from './vital-signs-list.component';

describe('VitalSignsListComponent', () => {
  let component: VitalSignsListComponent;
  let fixture: ComponentFixture<VitalSignsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalSignsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalSignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
