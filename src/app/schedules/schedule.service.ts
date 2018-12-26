import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from './../users/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Schedule {
  active: boolean;
  id: number;
  name: string;
  periodic: boolean;
  professionals: User[];

  constructor() {
    this.active = true;
  }
}

export const SCHEDULES: Schedule[] = [
  { active: true, id: 1, name: 'Agenda 1', periodic: true, professionals: [] },
  { active: true, id: 2, name: 'Agenda 2', periodic: false, professionals: [] },
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

  search(term: string): Observable<Schedule[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<Schedule[]>(`schedules/search/${term}`);
    }
    return of([new Schedule]);
  }
}
