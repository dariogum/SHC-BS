import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Schedule {
  id: number;
  name: string;
}

export const SCHEDULES: Schedule[] = [
  {id: 1, name: 'Agenda 1'},
  {id: 2, name: 'Agenda 2'},
];

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  create(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`schedules`, schedule, httpOptions);
  }

  read(id: number): Observable<Schedule> {
    if (id) {
      return this.http.get<Schedule>(`schedules/${id}`);
    }
  }

  readAll(): Observable<Schedule[]> {
    // return this.http.get<Schedule[]>(`schedules`);
    return of(SCHEDULES);
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`schedules`, schedule, httpOptions);
  }

  delete(schedule: Schedule): Observable<{}> {
    return this.http.delete(`schedules/${schedule.id}`, httpOptions);
  }
}
