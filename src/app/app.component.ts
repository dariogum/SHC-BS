import { Component } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { VaccineApplicationFormComponent } from './vaccine-application-form/vaccine-application-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { VitalSignsFormComponent } from './vital-signs-form/vital-signs-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appointment = { id: null, schedule: 1, date: new Date(), hour: null, proffesional: null, patient: null, indications: null };
  patient = { id: null, lastname: null, name: null, newborn: false, documentType: null, documentNumber: null, vaccinations: [] };
  schedule = { id: null, name: null, periodicity: null };
  vaccineApplication = { id: null, date: new Date(), age: null, vaccine: null, dose: null };
  visit = { id: null, date: new Date(), diagnostic: null, treatment: null, studies: null };
  vitalSignsRecord = { id: null, date: new Date(), bloodPressure: null, heartRate: null, temperature: null, breathingFrequency: null };

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) { }

  openBottomSheet(formComponent: any, data: any): void {
    const bottomSheetRef = this.bottomSheet.open(formComponent, {
      ariaLabel: data.title,
      data: data,
      disableClose: true
    });

    bottomSheetRef.afterDismissed().subscribe(data => {
      if (data && data.message) {
        this.snackBar.open(data.message, 'OK', { duration: 2000 });
      }
    });
  }

  openPatientBottomSheet(): void {
    const data = { title: 'Registrar un nuevo paciente', patient: this.patient };
    this.openBottomSheet(PatientFormComponent, data);
  }

  openVisitBottomSheet(): void {
    const data = { title: 'Registrar una visita', visit: this.visit };
    this.openBottomSheet(VisitFormComponent, data);
  }

  openVaccineApplicationBottomSheet(): void {
    const data = { title: 'Registrar la aplicación de una vacuna', patient: this.patient, vaccineApplication: this.vaccineApplication };
    this.openBottomSheet(VaccineApplicationFormComponent, data);
  }

  openVitalSignsBottomSheet(): void {
    const data = { title: 'Registrar los signos vitales', patient: this.patient, vitalSignsRecord: this.vitalSignsRecord };
    this.openBottomSheet(VitalSignsFormComponent, data);
  }

  openScheduleBottomSheet(): void {
    const data = { title: 'Crear una agenda', schedule: this.schedule };
    this.openBottomSheet(ScheduleFormComponent, data);
  }

  openAppointmentBottomSheet(): void {
    const data = { title: 'Registrar un turno', appointment: this.appointment };
    this.openBottomSheet(AppointmentFormComponent, data);
  }
}
