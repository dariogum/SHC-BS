import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SocialSecurity } from './social-security.service';
import { Country, State, City, COUNTRIES, STATES } from './country.service';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Patient {
  id: number;
  oldId: number;
  lastname: string;
  name: string;
  documentType: number;
  documentNumber: string;
  birthdate: Date;
  sex: number;
  birthType: number;
  birthWeight: number;
  bloodType: number;
  rhFactor: number;
  phone1: string;
  phone2: string;
  email: string;
  street: string;
  streetNumber: string;
  floor: string;
  flat: string;
  country: Country;
  state: State;
  city: City;

  constructor() {
    this.documentType = 1;
    this.country = COUNTRIES[0];
    this.state = STATES[0];
  }
}

export class PatientBackground {
  id: number;
  patient: Patient;
  apgar1: number;
  apgar2: number;
  gestationalAge: number;
  comments: string;
  father: string;
  mother: string;
  brothers: string;
  others: string;
}

export class PatientSocialSecurity {
  id: number;
  patient: Patient;
  socialSecurity: SocialSecurity;
  plan: string;
  socialSecurityId: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  create(patient: Patient): Observable<any> {
    return this.http.post<any>(environment.apiURL + `patients`, this.patientToJson(patient), httpOptions);
  }

  read(id: number): Observable<any> {
    if (id) {
      return this.http.get<any>(environment.apiURL + `patients/${id}`);
    }
  }

  readAll(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiURL + `patients`);
  }

  update(patient: Patient): Observable<any> {
    return this.http.put<any>(environment.apiURL + `patients/${patient.id}`, this.patientToJson(patient), httpOptions);
  }

  delete(patient: Patient): Observable<{}> {
    return this.http.delete(environment.apiURL + `patients/${patient.id}`, httpOptions);
  }

  search(term: string): Observable<any[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<any[]>(environment.apiURL + `patients/search/${term}`);
    }
    return of([new Patient]);
  }

  readPatientBackground(patient: Patient): Observable<any[]> {
    return this.http.get<any[]>(environment.apiURL + `patientsbackground/${patient.id}`);
  }

  readPatientSocialSecurities(patient: Patient): Observable<any[]> {
    return this.http.get<any[]>(environment.apiURL + `patientssocialsecurity/${patient.id}`);
  }

  createPatientSocialSecurity(patientSocialSecurity: PatientSocialSecurity): Observable<any> {
    return this.http.post<any>(environment.apiURL + `patientssocialsecurity`,
      this.patientSocialSecurityToJson(patientSocialSecurity), httpOptions);
  }

  updatePatientSocialSecurity(patientSocialSecurity: PatientSocialSecurity): Observable<any> {
    return this.http.put<any>(environment.apiURL + `patientssocialsecurity/${patientSocialSecurity.id}`,
      this.patientSocialSecurityToJson(patientSocialSecurity), httpOptions);
  }

  deletePatientSocialSecurity(patientSocialSecurity: PatientSocialSecurity): Observable<{}> {
    return this.http.delete(environment.apiURL + `patientssocialsecurity/${patientSocialSecurity.id}`, httpOptions);
  }

  patientToJson(patient: Patient) {
    const city = patient.city ? patient.city.id : null;
    const country = patient.country ? patient.country.id : null;
    const state = patient.state ? patient.state.id : null;
    return {
      'data': {
        'attributes': {
          'old_id': patient.oldId,
          'lastname': patient.lastname,
          'name': patient.name,
          'document_type': patient.documentType,
          'document_number': patient.documentNumber,
          'birthdate': moment(patient.birthdate).format('YYYY-MM-DD'),
          'sex': patient.sex,
          'birth_type': patient.birthType,
          'birth_weight': patient.birthWeight,
          'blood_type': patient.bloodType,
          'rh_factor': patient.rhFactor,
          'phone_1': patient.phone1,
          'phone_2': patient.phone2,
          'email': patient.email,
          'street': patient.street,
          'street_number': patient.streetNumber,
          'floor': patient.floor,
          'flat': patient.flat,
          'country': country,
          'state': state,
          'city': city,
        },
        'id': patient.id,
        'relationships': [],
        'type': 'patient',
      },
    };
  }

  patientBackgroundToJson(patientBackground: PatientBackground) {
    return {
      'data': {
        'attributes': {
          'patient': patientBackground.patient.id,
          'apgar_1': patientBackground.apgar1,
          'apgar_2': patientBackground.apgar2,
          'gestational_age': patientBackground.gestationalAge,
          'comments': patientBackground.comments,
          'father': patientBackground.father,
          'mother': patientBackground.mother,
          'brothers': patientBackground.brothers,
          'others': patientBackground.others,
        },
        'id': patientBackground.id,
        'relationships': [],
        'type': 'patientBackground',
      },
    };
  }

  patientSocialSecurityToJson(patientSocialSecurity: PatientSocialSecurity) {
    return {
      'data': {
        'attributes': {
          'patient': patientSocialSecurity.patient.id,
          'social_security': patientSocialSecurity.socialSecurity.id,
          'plan': patientSocialSecurity.plan,
          'social_security_id': patientSocialSecurity.socialSecurityId,
          'active': patientSocialSecurity.active,
        },
        'id': patientSocialSecurity.id,
        'relationships': [],
        'type': 'patientSocialSecurity',
      },
    };
  }
}
