import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';

import { Appointment, AppointmentService } from './../appointment.service';
import { Patient } from './../../patients/patient.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  today = new Date();
  patients: Patient[] = [
    { id: 1, lastname: 'Apellido1', name: 'Nombre1' },
    { id: 2, lastname: 'Apellido2', name: 'Nombre2' }
  ];
  filteredPatients: Patient[];
  professionals = [
    { id: 1, lastname: 'Profe1', name: 'Sional1' },
    { id: 2, lastname: 'Profe2', name: 'Sional2' }
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppointmentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit() {
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
        this.data.appointment = appointment;
        this.dismissBottomSheet('El turno fue registrado correctamente');
      }
    );
  }

  updateAppointment(): void {
    this.appointmentService.update(this.data.appointment).subscribe(
      appointment => {
        this.dismissBottomSheet('El turno fue modificado correctamente');
      }
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
          }
        );
      }
    });
  }

  confirmAppointment(): void {
    this.data.appointment.confirmed = true;
    this.appointmentService.update(this.data.appointment).subscribe(
      appointment => {
        this.dismissBottomSheet('El turno fue confirmado correctamente');
      }
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
