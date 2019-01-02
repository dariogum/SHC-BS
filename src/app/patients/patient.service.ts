import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SocialSecurity } from './social-security.service';
import { Country, State, City, COUNTRIES, STATES } from './country.service';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class BirthType {
  id: number;
  name: string;
}

const BIRTHTYPES: BirthType[] = [
  { id: 1, name: 'Parto' },
  { id: 2, name: 'Cesárea' },
];

export class Patient {
  apgar1: number;
  apgar2: number;
  apartment: string;
  birthday: Date;
  brothers: string;
  city: City;
  comment: string;
  country: Country;
  documentNumber: string;
  documentType: number;
  email: string;
  father: string;
  floor: string;
  gender: number;
  gestationalAge: number;
  id: number;
  lastname: string;
  mother: string;
  name: string;
  number: string;
  oldId: number;
  others: string;
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

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(environment.apiURL + `patients`, patient, httpOptions);
  }

  read(id: number): Observable<Patient> {
    if (id) {
      return this.http.get<Patient>(environment.apiURL + `patients/${id}`);
    }
  }

  readAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(environment.apiURL + `patients`);
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(environment.apiURL + `patients/${patient.id}`, this.patientToJson(patient), httpOptions);
  }

  delete(patient: Patient): Observable<{}> {
    return this.http.delete(environment.apiURL + `patients/${patient.id}`, httpOptions);
  }

  search(term: string): Observable<Patient[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Patient[]>(environment.apiURL + `patients/search/${term}`);
    }
    return of([new Patient]);
  }

  readAllBirthTypes(): Observable<BirthType[]> {
    return of(BIRTHTYPES);
  }

  patientToJson(patient: Patient) {
    return {
      'data': {
        'attributes': {
          'apartment': patient.apartment,
          'apgar1': patient.apgar1,
          'apgar2': patient.apgar2,
          'birthday': patient.birthday,
          'brothers': patient.brothers,
          'city': patient.city,
          'comment': patient.comment,
          'country': patient.country,
          'documentNumber': patient.documentNumber,
          'documentType': patient.documentType,
          'email': patient.email,
          'father': patient.father,
          'floor': patient.floor,
          'gender': patient.gender,
          'gestationalAge': patient.gestationalAge,
          'lastname': patient.lastname,
          'name': patient.name,
          'number': patient.number,
          'mother': patient.mother,
          'oldId': patient.oldId,
          'others': patient.others,
          'phone1': patient.phone1,
          'phone2': patient.phone2,
          'street': patient.street,
          'state': patient.state,
          'socialSecurity1': patient.socialSecurity1,
          'socialSecurityPlan1': patient.socialSecurityPlan1,
          'socialSecurityNumber1': patient.socialSecurityNumber1,
          'socialSecurity2': patient.socialSecurity2,
          'socialSecurityPlan2': patient.socialSecurityPlan2,
          'socialSecurityNumber2': patient.socialSecurityNumber2,
        },
        'id': patient.id,
        'relationships': {},
        'type': 'patient',
      },
    };
  }
}
