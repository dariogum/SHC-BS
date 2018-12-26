import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AppService } from './../../app.service';
import { AppointmentFormComponent } from './../appointment-form/appointment-form.component';
import { Appointment, AppointmentService } from './../appointment.service';
import { Schedule } from './../../schedules/schedule.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments = [];
  date = new Date();
  newAppointment = new Appointment;
  schedule: Schedule;

  constructor(
    private appService: AppService,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openAppointmentBottomSheet(appointment): void {
    const data = { title: 'Registrar un turno', appointment: appointment };
    this.appService.openBottomSheet(AppointmentFormComponent, data);
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(AppointmentFiltersComponent);

    dialogRef.afterClosed().subscribe(filters => {
      if (filters) {
        console.log(filters.value);
      }
    });
  }

  readAppointments(): void {
    if (this.schedule && this.date) {
      this.appointmentService.readAll().subscribe(
        appointments => this.appointments = appointments
      );
    } else {
      this.appointments = [];
    }
  }

}

@Component({
  selector: 'app-appointment-filters-dialog',
  templateUrl: 'appointment-list-filters.html',
})
export class AppointmentFiltersComponent {
  confirmed = false;
  notConfirmed = false;
  notSent = false;
  reprogrammed = false;

  constructor(
    public dialogRef: MatDialogRef<AppointmentFiltersComponent>
  ) { }

  closeDialog(form: NgForm) {
    this.dialogRef.close(form);
  }
}
