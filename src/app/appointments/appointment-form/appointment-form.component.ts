import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { AppService } from './../../app.service';
import { Appointment, AppointmentService } from './../appointment.service';
import { Patient, PatientService } from './../../patients/patient.service';
import { USERS } from './../../users/user.service';
import { SCHEDULES } from './../../schedules/schedule.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  filteredPatients: Patient[];
  patients: Patient[];
  professionals = USERS;
  schedules = SCHEDULES;
  searching: boolean;
  today = new Date();

  constructor(
    private appService: AppService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private bottomSheetRef: MatBottomSheetRef<AppointmentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readPatients();
  }

  onSubmit(): void {
    if (!this.data.appointment.id) {
      this.createAppointment();
    } else {
      this.updateAppointment();
    }
  }

  createAppointment(): void {
    this.appointmentService.create(this.data.appointment).subscribe(
      appointment => {
        this.dismissBottomSheet('El turno fue registrado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar el turno', 'OK', { duration: 2500 })
    );
  }

  updateAppointment(): void {
    this.appointmentService.update(this.data.appointment).subscribe(
      appointment => {
        this.dismissBottomSheet('El turno fue modificado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar el turno', 'OK', { duration: 2500 })
    );
  }

  cancelAppointment(): void {
    const dialogRef = this.dialog.open(AppointmentCancelComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.data.appointment.canceled = true;
        this.appointmentService.update(this.data.appointment).subscribe(
          appointment => {
            this.dismissBottomSheet('El turno fue cancelado correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al cancelar el turno', 'OK', { duration: 2500 })
        );
      }
    });
  }

  confirmAppointment(): void {
    this.data.appointment.confirmed = true;
    this.appointmentService.update(this.data.appointment).subscribe(
      appointment => {
        this.dismissBottomSheet('El turno fue confirmado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al confirmar el turno', 'OK', { duration: 2500 })
    );
  }

  rescheduleAppointment(): void {
    this.data.appointment.reprogrammed = true;
  }

  dismissBottomSheet(message: string): void {
    this.data.appointment = new Appointment;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'appointment',
      message: message
    });
  }

  patientsParser(patientsData: any): Patient[] {
    const patients: Patient[] = [];
    patientsData.data.forEach((patient: any) => {
      patients.push(this.appService.patientParser(patient));
    });
    return patients;
  }

  readPatients(): void {
    this.patientService.readAll().subscribe(
      patientsData => { this.patients = this.patientsParser(patientsData); this.searching = false; },
      error => this.snackBar.open('Ocurrió un error al obtener los pacientes', 'OK', { duration: 2500 })
    );
  }

  filterPatients(event): void {
    this.filteredPatients = this.patients.filter(patient => {
      return (patient.lastname.toLowerCase().includes(event.target.value.toLowerCase()) ||
      patient.name.toLowerCase().includes(event.target.value.toLowerCase()));
    });
  }

  displayFn(patient?: Patient): string | undefined {
    return patient ? patient.lastname + ' ' + patient.name : undefined;
  }

}

@Component({
  selector: 'app-appointment-cancel-dialog',
  template: `
  <h1 mat-dialog-title>Cancelar el turno</h1>
  <mat-dialog-content>
  <p>El turno quedará cancelado. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class AppointmentCancelComponent {

  constructor(
    public dialogRef: MatDialogRef<AppointmentCancelComponent>
  ) {}

}
