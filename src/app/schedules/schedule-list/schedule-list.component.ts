import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { AppService } from './../../app.service';
import { ScheduleFormComponent } from './../schedule-form/schedule-form.component';
import { Schedule, ScheduleService } from './../schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  schedules: Schedule[] = [];
  date = new Date();
  newSchedule: Schedule = new Schedule;
  searching = false;
  searchTerm$ = new Subject<string>();

  constructor(
    private appService: AppService,
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readSchedules();

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => this.searching = true),
      switchMap(term => this.scheduleService.search(term))
    ).subscribe(
      schedulesData => { this.schedules = this.schedulesParser(schedulesData); this.searching = false; },
      error => { this.snackBar.open('Ocurrió un error al buscar las agendas', 'OK', { duration: 2000 }); this.searching = false; }
    );
  }

  schedulesParser(data: any): Schedule[] {
    const schedules: Schedule[] = [];
    data.forEach((schedule: any) => {
      schedules.push(this.appService.scheduleParser(schedule));
    });
    return schedules;
  }

  openScheduleBottomSheet(schedule: Schedule): void {
    const data = { title: 'Información de la agenda', schedule: schedule };
    this.appService.openBottomSheet(ScheduleFormComponent, data);
  }

  readSchedules(): void {
    this.scheduleService.readAll().subscribe(
      schedules => this.schedules = schedules,
      error => this.snackBar.open('Ocurrió un error al obtener las agendas', 'OK', { duration: 2000 })
    );
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }

}
