import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Patient {
  birthday: Date;
  document: string;
  documentType: number;
  gender: number;
  id: number;
  lastname: string;
  name: string;
}

export const PATIENTS: Patient[] = [
  {birthday: new Date(), document: '33666888', documentType: 1, gender: 1, id: 1, lastname: 'De Prueba 1', name: 'Paciente'},
  {birthday: new Date(), document: '33666999', documentType: 1, gender: 2, id: 2, lastname: 'De Prueba 2', name: 'Paciente'},
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
}
