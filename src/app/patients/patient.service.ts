import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SocialSecurity } from './social-security.service';
import { Country, State, City, COUNTRIES, STATES, CITIES } from './country.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class BirthType {
  id: number;
  name: string;
}

const BIRTHTYPES: BirthType[] = [
  {id: 1, name: 'Parto'},
  {id: 2, name: 'Cesárea'},
];

export class Patient {
  apartment: string;
  birthday: Date;
  city: City;
  country: Country;
  document: string;
  documentType: number;
  email: string;
  floor: string;
  gender: number;
  id: number;
  lastname: string;
  name: string;
  number: string;
  phone1: string;
  phone2: string;
  socialSecurity1: SocialSecurity;
  socialSecurityPlan1: string;
  socialSecurityNumber1: string;
  socialSecurity2: SocialSecurity;
  socialSecurityPlan2: string;
  socialSecurityNumber2: string;
  state: State;
  street: string;

  constructor() {
    this.documentType = 1;
    this.country = COUNTRIES[0];
    this.state = STATES[0];
  }
}

export const PATIENTS: Patient[] = [
  {
    apartment: null,
    birthday: new Date(),
    city: null,
    country: null,
    document: null,
    documentType: null,
    email: null,
    floor: null,
    gender: null,
    id: 1,
    lastname: 'De Prueba',
    name: 'Paciente 1',
    number: null,
    phone1: null,
    phone2: null,
    socialSecurity1: null,
    socialSecurityPlan1: null,
    socialSecurityNumber1: null,
    socialSecurity2: null,
    socialSecurityPlan2: null,
    socialSecurityNumber2: null,
    state: null,
    street: null,
  },
  {
    apartment: null,
    birthday: new Date(),
    city: null,
    country: null,
    document: null,
    documentType: null,
    email: null,
    floor: null,
    gender: null,
    id: 1,
    lastname: 'De Prueba',
    name: 'Paciente 2',
    number: null,
    phone1: null,
    phone2: null,
    socialSecurity1: null,
    socialSecurityPlan1: null,
    socialSecurityNumber1: null,
    socialSecurity2: null,
    socialSecurityPlan2: null,
    socialSecurityNumber2: null,
    state: null,
    street: null,
  },
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`patients`, patient, httpOptions);
  }

  read(id: number): Observable<Patient> {
    if (id) {
      return this.http.get<Patient>(`patients/${id}`);
    }
  }

  readAll(): Observable<Patient[]> {
    // return this.http.get<Patient[]>(`patients`);
    return of(PATIENTS);
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`patients`, patient, httpOptions);
  }

  delete(patient: Patient): Observable<{}> {
    return this.http.delete(`patients/${patient.id}`, httpOptions);
  }

  search(term: string): Observable<Patient[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Patient[]>(`patients/search/${term}`);
    }
    return of([new Patient]);
  }

  readAllBirthTypes(): Observable<BirthType[]> {
    return of(BIRTHTYPES);
  }
}
