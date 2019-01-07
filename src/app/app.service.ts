import { Injectable } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';

import { Appointment } from './appointments/appointment.service';
import { Patient, PatientService, PatientSocialSecurity, PatientBackground } from './patients/patient.service';
import { User, UserService } from './users/user.service';
import { Schedule, ScheduleService } from './schedules/schedule.service';
import { Consultation } from './consultations/consultation.service';
import { VitalSigns } from './vital-signs/vital-signs.service';
import { SocialSecurity } from './patients/social-security.service';

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
        this.snackBar.open(bottomSheetData.message, 'OK', { duration: 2500 });
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
      const patientData = this.patientService.read(data.attributes.patient);
      const userData = this.userService.read(data.attributes.professional);
      const scheduleData = this.scheduleService.read(data.attributes.schedule);
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
      id: data.id,
      oldId: data.attributes.old_id,
      lastname: data.attributes.lastname,
      name: data.attributes.name,
      documentType: data.attributes.document_type,
      documentNumber: data.attributes.document_number,
      birthdate: data.attributes.birthdate,
      sex: data.attributes.sex,
      birthType: data.attributes.birth_type,
      birthWeight: data.attributes.birth_weight,
      bloodType: data.attributes.blood_type,
      rhFactor: data.attributes.rh_factor,
      phone1: data.attributes.phone_1,
      phone2: data.attributes.phone_2,
      email: data.attributes.email,
      street: data.attributes.street,
      streetNumber: data.attributes.number,
      floor: data.attributes.floor,
      flat: data.attributes.flat,
      country: data.attributes.country,
      state: data.attributes.state,
      city: data.attributes.city,
    };
    return patient;
  }

  patientBackgroundParser(data: any, patient: Patient): PatientBackground {
    const patientBackground: PatientBackground = {
      id: data.id,
      patient: patient,
      apgar1: data.attributes.apgar_1,
      apgar2: data.attributes.apgar_2,
      gestationalAge: data.attributes.gestational_age,
      comments: data.attributes.comments,
      father: data.attributes.father,
      mother: data.attributes.mother,
      brothers: data.attributes.brothers,
      others: data.attributes.others,
    };
    return patientBackground;
  }

  patientSocialSecurityParser(data: any, patient: Patient): PatientSocialSecurity {
    const patientSocialSecurity: PatientSocialSecurity = {
      id: data.id,
      patient: patient,
      socialSecurity: data.attributes.social_security.id,
      plan: data.attributes.plan,
      socialSecurtyId: data.attributes.social_security.id,
      active: data.attributes.active,
    };
    return patientSocialSecurity;
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
      periodicity: data.attributes.periodic,
      professionals: [],
    };
    if (data.relationships.professionals.length) {
      data.relationships.professionals.forEach((professional: any) => {
        this.userService.read(professional.id).subscribe(result => schedule.professionals.push(this.userParser(result)));
      });
    }
    return schedule;
  }

  consultationParser(data: any): Consultation {
    const consultation: Consultation = {
      date: data.attributes.date,
      id: data.id,
      diagnostic: data.attributes.diagnostic,
      treatment: data.attributes.treatment,
    };
    return consultation;
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
