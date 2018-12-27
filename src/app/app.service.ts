import { Injectable } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';

import { Appointment } from './appointments/appointment.service';
import { Patient, PatientService } from './patients/patient.service';
import { User, UserService } from './users/user.service';
import { Schedule, ScheduleService } from './schedules/schedule.service';
import { Visit } from './visits/visit.service';
import { VitalSigns } from './vital-signs/vital-signs.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  layout = 'web';
  sidenavOpened = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private patientService: PatientService,
    private userService: UserService,
    private scheduleService: ScheduleService,
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
    const appointment: Appointment = {
      canceled: data.attributes.canceled,
      confirmed: data.attributes.confirmed,
      createdAt: data.attributes.createdAt,
      date: data.attributes.date,
      hour: data.attributes.hour,
      id: data.id,
      indications: data.attributes.indications,
      patient: null,
      professional: null,
      reprogrammed: data.attributes.reprogrammed,
      reminderSent: data.attributes.reminderSent,
      schedule: null,
      updatedAt: data.attributes.updatedAt,
    };
    if (data.attributes.patient && data.attributes.professional && data.attributes.schedule) {
      let patientData = this.patientService.read(data.attributes.patient);
      let userData = this.userService.read(data.attributes.professional);
      let scheduleData = this.scheduleService.read(data.attributes.schedule);
      forkJoin([patientData, userData, scheduleData]).subscribe(results => {
        appointment.patient = this.patientParser(results[0]);
        appointment.professional = this.userParser(results[1]);
        appointment.schedule = this.scheduleParser(results[2]);
      });
    }
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
    const schedule: Schedule = {
      active: data.attributes.active,
      id: data.id,
      name: data.attributes.name,
      periodic: data.attributes.periodic,
      professionals: [],
    };
    if (data.relationships.professionals.length) {
      data.relationships.professionals.forEach((professional: any) => {
        this.userService.read(professional.id).subscribe(result => schedule.professionals.push(this.userParser(result)));
      });
    }
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

  vitalSignsRecordParser(data: any): VitalSigns {
    const vitalSignsRecord: VitalSigns = {
      bloodPressure: data.attributes.bloodPressure,
      breathingFrequency: data.attributes.breathingFrequency,
      date: data.attributes.date,
      heartRate: data.attributes.heartRate,
      id: data.id,
      temperature: data.attributes.temperature,
    };
    return vitalSignsRecord;
  }
}
