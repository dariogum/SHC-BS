import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

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
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  date = new Date();
  newAppointment: Appointment = new Appointment;
  schedule: Schedule;
  searching = false;
  searchTerm$ = new Subject<string>();

  constructor(
    private appService: AppService,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => this.searching = true),
      switchMap(term => this.appointmentService.search(term))
    ).subscribe(
      appointmentsData => { this.appointments = this.appointmentsParser(appointmentsData); this.searching = false; },
      error => { this.snackBar.open('Ocurrió un error al buscar los turnos', 'OK', { duration: 2500 }); this.searching = false; }
    );
  }

  appointmentsParser(data: any): Appointment[] {
    const appointments: Appointment[] = [];
    data.forEach((appointment: any) => {
      appointments.push(this.appService.appointmentParser(appointment));
    });
    return appointments;
  }

  openAppointmentBottomSheet(appointment: Appointment): void {
    const data = { title: 'Información del turno', appointment: appointment };
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
        appointments => this.appointments = appointments,
        error => this.snackBar.open('Ocurrió un error al obtener los turnos', 'OK', { duration: 2500 })
      );
    } else {
      this.appointments = [];
    }
  }

  search(term: string) {
    if (!term.trim().length) {
      this.filteredAppointments = [];
    } else {
      this.filteredAppointments = this.appointments.filter(appointment => {
        return (
          appointment.patient.lastname.toLowerCase().search(term.toLowerCase()) !== -1 ||
          appointment.patient.name.toLowerCase().search(term.toLowerCase()) !== -1 ||
          appointment.hour.toLowerCase().search(term.toLowerCase()) !== -1
        );
      });
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
