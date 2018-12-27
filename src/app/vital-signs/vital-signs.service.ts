import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class VitalSigns {
  bloodPressure: string;
  breathingFrequency: number;
  date: Date;
  heartRate: number;
  id: number;
  temperature: number;

  constructor() {
    this.date = new Date();
  }
}

export const VITALSIGNSRECORDS: VitalSigns[] = [
  {
    bloodPressure: '120/80',
    breathingFrequency: 50,
    date: new Date(),
    heartRate: 50,
    id: 1,
    temperature: 36,
  },
  {
    bloodPressure: '120/80',
    breathingFrequency: 50,
    date: new Date(),
    heartRate: 50,
    id: 1,
    temperature: 36,
  },
];

@Injectable({
  providedIn: 'root'
})
export class VitalSignsService {

  constructor(
    private http: HttpClient,
  ) { }

  create(vitalSignsRecord: VitalSigns): Observable<VitalSigns> {
    return this.http.post<VitalSigns>(`vitalSigns`, vitalSignsRecord, httpOptions);
  }

  read(id: number): Observable<VitalSigns> {
    if (id) {
      return this.http.get<VitalSigns>(`vitalSigns/${id}`);
    }
  }

  readAll(): Observable<VitalSigns[]> {
    // return this.http.get<VitalSigns[]>(`vitalSigns`);
    return of(VITALSIGNSRECORDS);
  }

  update(vitalSignsRecord: VitalSigns): Observable<VitalSigns> {
    return this.http.put<VitalSigns>(`vitalSigns`, vitalSignsRecord, httpOptions);
  }

  delete(vitalSignsRecord: VitalSigns): Observable<{}> {
    return this.http.delete(`vitalSigns/${vitalSignsRecord.id}`, httpOptions);
  }
}
