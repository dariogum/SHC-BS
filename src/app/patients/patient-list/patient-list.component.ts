import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppService } from './../../app.service';
import { PatientFormComponent } from './../patient-form/patient-form.component';
import { Patient, PatientService } from './../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  date = new Date();
  newPatient: Patient = new Patient;
  searching = false;
  searchTerm$ = new Subject<string>();

  constructor(
    private appService: AppService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.readPatients();

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => { term.length ? this.searching = true : this.searching = false; }),
      switchMap(term => this.patientService.search(term))
    ).subscribe(
      patientsData => { this.patients = this.patientsParser(patientsData); this.searching = false; },
      error => { this.snackBar.open('Ocurrió un error al buscar los pacientes', 'OK', { duration: 2500 }); this.searching = false; }
    );
  }

  patientsParser(patientsData: any): Patient[] {
    const patients: Patient[] = [];
    if (patientsData.data) {
      patientsData.data.forEach((patient: any) => {
        patients.push(this.appService.patientParser(patient));
      });
    }
    return patients;
  }

  openPatientBottomSheet(patient: Patient): void {
    const data = { title: 'Información del paciente', patient: patient };
    this.appService.openBottomSheet(PatientFormComponent, data);
  }

  readPatients(): void {
    this.searching = true;
    this.patientService.readAll().subscribe(
      patientsData => { this.patients = this.patientsParser(patientsData); this.searching = false; },
      error => this.snackBar.open('Ocurrió un error al obtener los pacientes', 'OK', { duration: 2500 })
    );
  }

  search(term: string) {
    term = term.replace(' ', '').toLowerCase();
    this.searchTerm$.next(term);
  }

  goToPatientClinicHistory(patient: Patient): void {
    this.router.navigate(['patients/' + patient.id]);
  }

}
