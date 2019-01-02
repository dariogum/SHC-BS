import { Component, OnInit, Input } from '@angular/core';
import { Patient, PatientService } from './../patient.service';

@Component({
  selector: 'app-patient-background',
  templateUrl: './patient-background.component.html',
  styleUrls: ['./patient-background.component.css']
})
export class PatientBackgroundComponent implements OnInit {
  @Input() patient: Patient;

  constructor(
    private patientService: PatientService,
  ) { }

  ngOnInit() {
  }

}
