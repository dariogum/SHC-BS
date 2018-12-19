import { Component } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  patient = { id: null, lastname: null, name: null, newborn: false, documentType: null, documentNumber: null };
  visit = { id: null, date: new Date(), diagnostic: null, treatment: null, studies: null };

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) { }

  openBottomSheet(formComponent: any, data: any): void {
    const bottomSheetRef = this.bottomSheet.open(formComponent, {
      ariaLabel: data.title,
      data: data
    });

    bottomSheetRef.afterDismissed().subscribe(data => {
      if (data && data.message) {
        this.snackBar.open(data.message, 'OK', {duration: 2000});
      }
    });
  }

  openPatientBottomSheet(): void {
    const data = { title: 'Formulario de un paciente', patient: this.patient };
    this.openBottomSheet(PatientFormComponent, data);
  }

  openVisitBottomSheet(): void {
    const data = { title: 'Formulario de una visita', visit: this.visit };
    this.openBottomSheet(VisitFormComponent, data);
  }

  openVaccineApplicationBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(PatientFormComponent, {
      ariaLabel: 'Formulario de una aplicación de vacuna',
      data: this.patient
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  openVitalSignsBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(PatientFormComponent, {
      ariaLabel: 'Formulario de medición de constantes vitales',
      data: this.patient
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  openScheduleBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(PatientFormComponent, {
      ariaLabel: 'Formulario de una agenda',
      data: this.patient
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  openAppointmentBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(PatientFormComponent, {
      ariaLabel: 'Formulario de un turno',
      data: this.patient
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }
}
