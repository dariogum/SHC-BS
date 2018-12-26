import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Patient, PATIENTS } from './../patients/patient.service';
import { Schedule, SCHEDULES } from './../schedules/schedule.service';
import { User, USERS } from './../users/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Appointment {
  canceled: boolean;
  confirmed: boolean;
  createdAt: Date;
  date: Date;
  hour: string;
  id: number;
  indications: string;
  patient: Patient;
  professional: User;
  reprogrammed: boolean;
  reminderSent: boolean;
  schedule: Schedule;
  updatedAt: Date;

  constructor() { this.date = new Date(); }
}

const APPOINTMENTS: Appointment[] = [
  {
    canceled: false, confirmed: false, createdAt: new Date(), date: new Date(), hour: '10:45',
    id: 1, indications: null, patient: PATIENTS[0], professional: USERS[0], reprogrammed: false,
    reminderSent: false, schedule: SCHEDULES[0], updatedAt: new Date()
  },
  {
    canceled: false, confirmed: false, createdAt: new Date(), date: new Date(), hour: '11:45',
    id: 2, indications: null, patient: PATIENTS[1], professional: USERS[1], reprogrammed: false,
    reminderSent: false, schedule: SCHEDULES[1], updatedAt: new Date()
  },
  {
    canceled: false, confirmed: false, createdAt: new Date(), date: new Date(), hour: '12:45',
    id: 3, indications: null, patient: PATIENTS[0], professional: USERS[0], reprogrammed: false,
    reminderSent: false, schedule: SCHEDULES[0], updatedAt: new Date()
  },
  {
    canceled: false, confirmed: false, createdAt: new Date(), date: new Date(), hour: '13:45',
    id: 4, indications: null, patient: PATIENTS[1], professional: USERS[1], reprogrammed: false,
    reminderSent: false, schedule: SCHEDULES[1], updatedAt: new Date()
  },
];

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) { }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`appointments`, appointment, httpOptions);
  }

  read(id: number): Observable<Appointment> {
    if (id) {
      return this.http.get<Appointment>(`appointments/${id}`);
    }
  }

  readAll(): Observable<Appointment[]> {
    // return this.http.get<Appointment[]>(`appointments`);
    return of(APPOINTMENTS);
  }

  update(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`appointments`, appointment, httpOptions);
  }

  delete(appointment: Appointment): Observable<{}> {
    return this.http.delete(`appointments/${appointment.id}`, httpOptions);
  }

  search(term: string): Observable<Appointment[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Appointment[]>(`appointments/search/${term}`);
    }
    return of([new Appointment]);
  }
}
