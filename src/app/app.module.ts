import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { VaccineApplicationFormComponent } from './vaccine-application-form/vaccine-application-form.component';
import { VitalSignsFormComponent } from './vital-signs-form/vital-signs-form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    VisitFormComponent,
    VaccineApplicationFormComponent,
    VitalSignsFormComponent,
    ScheduleFormComponent,
    AppointmentFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  entryComponents: [
    PatientFormComponent,
    VisitFormComponent,
    VaccineApplicationFormComponent,
    VitalSignsFormComponent,
    ScheduleFormComponent,
    AppointmentFormComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
