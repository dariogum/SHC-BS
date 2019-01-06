import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Consultation {
  date: Date;
  diagnostic: string;
  id: number;
  treatment: string;
}

export const VISITS: Consultation[] = [
  { date: new Date(), diagnostic: 'Probando el diagnóstico 1', id: 1, treatment: 'Probando el tratamiento 4' },
  { date: new Date(), diagnostic: 'Probando el diagnóstico 2', id: 2, treatment: 'Probando el tratamiento 5' },
  { date: new Date(), diagnostic: 'Probando el diagnóstico 3', id: 3, treatment: 'Probando el tratamiento 6' },
];

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(
    private http: HttpClient,
  ) { }

  create(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(`consultations`, consultation, httpOptions);
  }

  read(id: number): Observable<Consultation> {
    if (id) {
      return this.http.get<Consultation>(`consultations/${id}`);
    }
  }

  readAll(): Observable<Consultation[]> {
    // return this.http.get<Consultation[]>(`consultations`);
    return of(VISITS);
  }

  update(consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`consultations`, consultation, httpOptions);
  }

  delete(consultation: Consultation): Observable<{}> {
    return this.http.delete(`consultations/${consultation.id}`, httpOptions);
  }

  search(term: string): Observable<Consultation[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Consultation[]>(`consultations/search/${term}`);
    }
    return of([new Consultation]);
  }
}
