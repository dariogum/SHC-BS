import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA,
  MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { PatientService, PatientSocialSecurity } from './../patient.service';
import { SocialSecurity, SocialSecurityService } from './../social-security.service';
import { AppService } from 'src/app/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-social-security-form',
  templateUrl: './patient-social-security-form.component.html',
  styleUrls: ['./patient-social-security-form.component.css']
})
export class PatientSocialSecurityFormComponent implements OnInit {
  filteredSocialSecurities: SocialSecurity[] = [];
  socialSecurities: SocialSecurity[] = [];

  constructor(
    private appService: AppService,
    private bottomSheetRef: MatBottomSheetRef<PatientSocialSecurityFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private socialSecurityService: SocialSecurityService,
  ) { }

  ngOnInit() {
    this.data.patientSocialSecurity.patient = this.data.patient;
    this.data.patientSocialSecurity.active = true;
    this.readSocialSecurities();
  }

  displayFn(socialSecurity?: SocialSecurity): string | undefined {
    return socialSecurity ? socialSecurity.name : undefined;
  }

  verifySocialSecuritySelection(bottomSheetForm: NgForm, event: any) {
    if (typeof event.value === 'string') {
      bottomSheetForm.controls.socialSecurity.setErrors({
        'notObject': true
      });
      bottomSheetForm.controls.socialSecurity.updateValueAndValidity();
    }
  }

  filterSocialSecurities(event): void {
    this.filteredSocialSecurities = this.socialSecurities.filter(
      socialSecurity => socialSecurity.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  socialSecuritiesParser(socialSecuritiesData: any): SocialSecurity[] {
    const socialSecurities: SocialSecurity[] = [];
    if (socialSecuritiesData.data) {
      socialSecuritiesData.data.forEach((socialSecurity: any) => {
        socialSecurities.push(this.appService.socialSecurityParser(socialSecurity));
      });
    }
    return socialSecurities;
  }

  readSocialSecurities(): void {
    this.socialSecurityService.readAll().subscribe(socialSecurities =>
      this.socialSecurities = this.socialSecuritiesParser(socialSecurities)
    );
  }

  onSubmit(): void {
    if (!this.data.patientSocialSecurity.id) {
      this.createPatientSocialSecurity();
    } else {
      this.updatePatientSocialSecurity();
    }
  }

  createPatientSocialSecurity(): void {
    this.patientService.createPatientSocialSecurity(this.data.patientSocialSecurity).subscribe(
      patientSocialSecurity => {
        this.dismissBottomSheet('La obra social fue registrada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar la obra social', 'OK', { duration: 2500 })
    );
  }

  updatePatientSocialSecurity(): void {
    this.patientService.updatePatientSocialSecurity(this.data.patientSocialSecurity).subscribe(
      patientSocialSecurity => {
        this.dismissBottomSheet('La obra social fue modificada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar la obra social', 'OK', { duration: 2500 })
    );
  }

  deletePatientSocialSecurity(): void {
    const dialogRef = this.dialog.open(PatientSocialSecurityDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.patientService.deletePatientSocialSecurity(this.data.patientSocialSecurity).subscribe(
          _ => {
            this.dismissBottomSheet('La obra social fue eliminada correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al eliminar la obra social', 'OK', { duration: 2500 })
        );
      }
    });
  }

  dismissBottomSheet(message: string): void {
    this.data.patientSocialSecurity = new PatientSocialSecurity;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'patientSocialSecurity',
      message: message
    });
  }
}

@Component({
  selector: 'app-patient-social-security-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar la obra social</h1>
  <mat-dialog-content>
  <p>La obra social será eliminada. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class PatientSocialSecurityDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<PatientSocialSecurityDeleteComponent>
  ) { }

}
