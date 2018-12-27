import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { AppService } from './../../app.service';
import { VisitFormComponent } from './../visit-form/visit-form.component';
import { Visit, VisitService } from './../visit.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {
  visits: Visit[] = [];
  filteredVisits: Visit[] = [];
  date = new Date();
  newVisit: Visit = new Visit;
  searching = false;

  constructor(
    private appService: AppService,
    private visitService: VisitService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readVisits();
  }

  visitsParser(data: any): Visit[] {
    let visits: Visit[] = []
    data.forEach((visit: any) => {
      visits.push(this.appService.visitParser(visit));
    });
    return visits;
  }

  openVisitBottomSheet(visit: Visit): void {
    const data = { title: 'Información de la visita', visit: visit };
    this.appService.openBottomSheet(VisitFormComponent, data);
  }

  readVisits(): void {
    this.visitService.readAll().subscribe(
      visits => this.visits = visits,
      error => this.snackBar.open('Ocurrió un error al obtener las visitas', 'OK', { duration: 2000 })
    );
  }

  search(term: string) {
    if (!term.trim().length) {
      this.filteredVisits = [];
    } else {
      this.filteredVisits = this.visits.filter(visit => {
        return (
          visit.diagnostic.toLowerCase().search(term.toLowerCase()) !== -1 ||
          visit.treatment.toLowerCase().search(term.toLowerCase()) !== -1
        );
      });
    }
  }
}
