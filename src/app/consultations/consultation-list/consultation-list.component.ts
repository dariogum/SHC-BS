import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AppService } from './../../app.service';
import { ConsultationFormComponent } from './../consultation-form/consultation-form.component';
import { Consultation, ConsultationService } from './../consultation.service';
import { Patient } from 'src/app/patients/patient.service';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  @Input() patient: Patient;
  consultations: Consultation[] = [];
  filteredConsultations: Consultation[] = [];
  date = new Date();
  newConsultation: Consultation = new Consultation;
  searching = false;

  constructor(
    private appService: AppService,
    private consultationService: ConsultationService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readConsultations();
  }

  consultationsParser(data: any): Consultation[] {
    const consultations: Consultation[] = [];
    data.forEach((consultation: any) => {
      consultations.push(this.appService.consultationParser(consultation));
    });
    return consultations;
  }

  openConsultationBottomSheet(consultation: Consultation): void {
    const data = { title: 'Información de la consultationa', consultation: consultation };
    this.appService.openBottomSheet(ConsultationFormComponent, data);
  }

  readConsultations(): void {
    this.consultationService.readAll().subscribe(
      consultations => this.consultations = consultations,
      error => this.snackBar.open('Ocurrió un error al obtener las consultationas', 'OK', { duration: 2500 })
    );
  }

  search(term: string) {
    if (!term.trim().length) {
      this.filteredConsultations = [];
    } else {
      this.filteredConsultations = this.consultations.filter(consultation => {
        return (
          consultation.diagnostic.toLowerCase().search(term.toLowerCase()) !== -1 ||
          consultation.treatment.toLowerCase().search(term.toLowerCase()) !== -1
        );
      });
    }
  }
}
