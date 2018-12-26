import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Visit {
  date: Date;
  diagnostic: string;
  id: number;
  treatment: string;
}

export const VISITS: Visit[] = [
  { date: new Date(), diagnostic: 'Probando el diagnóstico', id: 1, treatment: 'Probando el tratamiento' },
  { date: new Date(), diagnostic: 'Probando el diagnóstico', id: 2, treatment: 'Probando el tratamiento' },
  { date: new Date(), diagnostic: 'Probando el diagnóstico', id: 3, treatment: 'Probando el tratamiento' },
];

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private http: HttpClient,
  ) { }

  create(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(`visits`, visit, httpOptions);
  }

  read(id: number): Observable<Visit> {
    if (id) {
      return this.http.get<Visit>(`visits/${id}`);
    }
  }

  readAll(): Observable<Visit[]> {
    // return this.http.get<Visit[]>(`visits`);
    return of(VISITS);
  }

  update(visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(`visits`, visit, httpOptions);
  }

  delete(visit: Visit): Observable<{}> {
    return this.http.delete(`visits/${visit.id}`, httpOptions);
  }

  search(term: string): Observable<Visit[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Visit[]>(`visits/search/${term}`);
    }
    return of([new Visit]);
  }
}
