import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppService } from './../../app.service';
import { Patient, PatientService } from './../patient.service';
import { MatAccordion, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-patient-clinic-history',
  templateUrl: './patient-clinic-history.component.html',
  styleUrls: ['./patient-clinic-history.component.css']
})
export class PatientClinicHistoryComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  patient: Patient = new Patient;

  constructor(
    private appService: AppService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() { }

  goToPatients(): void {
    this.router.navigate(['/patients']);
  }

  closeAll(): void {
    this.accordion.closeAll();
  }

  openAll(): void {
    this.accordion.openAll();
  }

  deletePatient(): void {
    const dialogRef = this.dialog.open(PatientDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.patientService.delete(this.patient).subscribe(
          _ => { },
          error => this.snackBar.open('Ocurrió un error al eliminar el paciente', 'OK', { duration: 2000 })
        );
      }
    });
  }

}

@Component({
  selector: 'app-patient-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar el paciente</h1>
  <mat-dialog-content>
  <p>El paciente será eliminado. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class PatientDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<PatientDeleteComponent>
  ) {}

}
