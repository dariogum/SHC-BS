import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';

import { Patient, PatientService } from './../patient.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  constructor(
    private appService: AppService,
    private bottomSheetRef: MatBottomSheetRef<PatientFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.data.patient.id) {
      this.createPatient();
    }
  }

  createPatient(): void {
    this.patientService.create(this.data.patient).subscribe(
      patient => {
        this.dismissBottomSheet('El paciente fue registrado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar el paciente', 'OK', { duration: 2500 })
    );
  }

  dismissBottomSheet(message: string): void {
    this.data.patient = new Patient;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'patient',
      message: message
    });
  }

}
