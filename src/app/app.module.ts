import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppointmentFormComponent, AppointmentCancelComponent } from './appointments/appointment-form/appointment-form.component';
import { AppointmentFiltersComponent } from './appointments/appointment-list/appointment-list.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { VisitFormComponent, VisitDeleteComponent } from './visits/visit-form/visit-form.component';
import { VaccineApplicationFormComponent } from './vaccinations/vaccine-application-form/vaccine-application-form.component';
import { VitalSignsFormComponent } from './vital-signs/vital-signs-form/vital-signs-form.component';
import { ScheduleFormComponent } from './schedules/schedule-form/schedule-form.component';

const appRoutes: Routes = [
  { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule' },
  { path: 'patients', loadChildren: './patients/patients.module#PatientsModule' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCancelComponent,
    AppointmentFiltersComponent,
    AppointmentFormComponent,
    PatientFormComponent,
    ScheduleFormComponent,
    VaccineApplicationFormComponent,
    VisitDeleteComponent,
    VisitFormComponent,
    VitalSignsFormComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  entryComponents: [
    AppointmentCancelComponent,
    AppointmentFormComponent,
    AppointmentFiltersComponent,
    PatientFormComponent,
    ScheduleFormComponent,
    VaccineApplicationFormComponent,
    VisitDeleteComponent,
    VisitFormComponent,
    VitalSignsFormComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
