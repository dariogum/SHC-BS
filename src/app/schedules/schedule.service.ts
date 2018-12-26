import { Injectable } from '@angular/core';

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

  constructor() { }
}
