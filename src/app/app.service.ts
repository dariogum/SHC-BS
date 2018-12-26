import { Injectable } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';

import { Appointment } from './appointments/appointment.service';
import { Patient, PatientService } from './patients/patient.service';
import { User, UserService } from './users/user.service';
import { Schedule, ScheduleService } from './schedules/schedule.service';
import { Visit, VisitService } from './visits/visit.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  layout = 'web';
  sidenavOpened = false;

  patient = { id: null, lastname: null, name: null, newborn: false, documentType: null, documentNumber: null, vaccinations: [] };
  schedule = { id: null, name: null, periodicity: null };
  vaccineApplication = { id: null, date: new Date(), age: null, vaccine: null, dose: null };
  visit = { id: null, date: new Date(), diagnostic: null, treatment: null, studies: null };
  vitalSignsRecord = { id: null, date: new Date(), bloodPressure: null, heartRate: null, temperature: null, breathingFrequency: null };

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private patientService: PatientService,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private visitService: VisitService,
  ) { }

  openBottomSheet(formComponent: any, data: any): void {
    const bottomSheetRef = this.bottomSheet.open(formComponent, {
      ariaLabel: data.title,
      data: data,
      disableClose: true
    });

    bottomSheetRef.afterDismissed().subscribe(bottomSheetData => {
      if (bottomSheetData && bottomSheetData.message) {
        this.snackBar.open(bottomSheetData.message, 'OK', { duration: 2000 });
      }
    });
  }

  setLayout(layout: string) {
    this.layout = layout;
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  appointmentParser(data: any): Appointment {
    let patientData: any, userData: any, scheduleData: any;
    let patient: Patient = null;
    let professional: User = null;
    let schedule: Schedule = null;
    if (data.attributes.patient && data.attributes.professional && data.attributes.schedule) {
      patientData = this.patientService.read(data.attributes.patient);
      userData = this.userService.read(data.attributes.professional);
      scheduleData = this.scheduleService.read(data.attributes.schedule);
      forkJoin([patientData, userData, scheduleData]).subscribe(results => {
        patient = this.patientParser(results[0]);
        professional = this.userParser(results[1]);
        schedule = this.scheduleParser(results[2]);
      });
    }
    const appointment: Appointment = {
      canceled: data.attributes.canceled,
      confirmed: data.attributes.confirmed,
      createdAt: data.attributes.createdAt,
      date: data.attributes.date,
      hour: data.attributes.hour,
      id: data.id,
      indications: data.attributes.indications,
      patient: patient,
      professional: professional,
      reprogrammed: data.attributes.reprogrammed,
      reminderSent: data.attributes.reminderSent,
      schedule: schedule,
      updatedAt: data.attributes.updatedAt,
    };
    return appointment;
  }

  patientParser(data: any): Patient {
    const patient: Patient = {
      birthday: data.attributes.birthday,
      document: data.attributes.document,
      documentType: data.attributes.documentType,
      gender: data.attributes.gender,
      id: data.id,
      lastname: data.attributes.lastname,
      name: data.attributes.name,
    };
    return patient;
  }

  userParser(data: any): User {
    const user: User = {
      active: data.attributes.active,
      createdAt: data.attributes.createdAt,
      email: data.attributes.email,
      id: data.id,
      lastname: data.attributes.lastname,
      name: data.attributes.name,
      password: '',
      role: data.attributes.role,
      updatedAt: data.attributes.updatedAt,
    };
    return user;
  }

  scheduleParser(data: any): Schedule {
    const professionals: User[] = [];
    if (data.relationships.professionals.length) {
      data.relationships.professionals.forEach((professional: any) => {
        this.userService.read(professional.id).subscribe(result => professionals.push(this.userParser(result)));
      });
    }
    const schedule: Schedule = {
      active: data.attributes.active,
      id: data.id,
      name: data.attributes.name,
      periodic: data.attributes.periodic,
      professionals: professionals,
    };
    return schedule;
  }

  visitParser(data: any): Visit {
    const visit: Visit = {
      date: data.attributes.date,
      id: data.id,
      diagnostic: data.attributes.diagnostic,
      treatment: data.attributes.treatment,
    };
    return visit;
  }
}
