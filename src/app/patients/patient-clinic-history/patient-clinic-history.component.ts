import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppService } from './../../app.service';
import { Patient, PatientService } from './../patient.service';

@Component({
  selector: 'app-patient-clinic-history',
  templateUrl: './patient-clinic-history.component.html',
  styleUrls: ['./patient-clinic-history.component.css']
})
export class PatientClinicHistoryComponent implements OnInit {
  patient: Patient = new Patient;

  constructor(
    private appService: AppService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  goToPatients(): void {
    this.router.navigate(['/patients']);
  }

}
