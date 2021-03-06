import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Patient, PatientService } from './../patient.service';
import { MatAccordion, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-patient-clinic-history',
  templateUrl: './patient-clinic-history.component.html',
  styleUrls: ['./patient-clinic-history.component.css']
})
export class PatientClinicHistoryComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  expanded = false;
  loading: boolean;
  patient: Patient;
  patientId: number;

  constructor(
    private appService: AppService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.patientService.read(id).subscribe(
      patientData => { this.patient = this.appService.patientParser(patientData.data); this.loading = false; },
      error => this.snackBar.open('Ocurrió un error al cargar la historia clínica del paciente', 'OK', { duration: 2500 })
    );
  }

  goToPatients(): void {
    this.router.navigate(['/patients']);
  }

  closeAll(): void {
    this.expanded = false;
    this.accordion.closeAll();
  }

  openAll(): void {
    this.expanded = true;
    this.accordion.openAll();
  }

  deletePatient(): void {
    const dialogRef = this.dialog.open(PatientDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.patientService.delete(this.patient).subscribe(
          _ => { this.snackBar.open('El paciente fue eliminado correctamente', 'OK', { duration: 2500 }); this.goToPatients(); },
          error => this.snackBar.open('Ocurrió un error al eliminar el paciente', 'OK', { duration: 2500 })
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
  ) { }

}
