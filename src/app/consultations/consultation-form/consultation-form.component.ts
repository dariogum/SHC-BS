import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { Consultation, ConsultationService } from './../consultation.service';

@Component({
  selector: 'app-consultation-form',
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.css']
})
export class ConsultationFormComponent implements OnInit {
  today = new Date();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ConsultationFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private consultationService: ConsultationService,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.data.consultation.id) {
      this.createConsultation();
    } else {
      this.updateConsultation();
    }
  }

  createConsultation(): void {
    this.consultationService.create(this.data.consultation).subscribe(
      consultation => {
        this.dismissBottomSheet('La consultationa fue registrada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar la consultationa', 'OK', { duration: 2500 })
    );
  }

  updateConsultation(): void {
    this.consultationService.update(this.data.consultation).subscribe(
      consultation => {
        this.dismissBottomSheet('La consultationa fue modificada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar la consultationa', 'OK', { duration: 2500 })
    );
  }

  deleteConsultation(): void {
    const dialogRef = this.dialog.open(ConsultationDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.consultationService.delete(this.data.consultation).subscribe(
          _ => {
            this.dismissBottomSheet('La consultationa fue eliminada correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al eliminar la consultationa', 'OK', { duration: 2500 })
        );
      }
    });
  }

  dismissBottomSheet(message: string): void {
    this.data.consultation = new Consultation;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'consultation',
      message: message
    });
  }
}

@Component({
  selector: 'app-consultation-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar la consultationa</h1>
  <mat-dialog-content>
  <p>La consultationa será eliminada. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class ConsultationDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConsultationDeleteComponent>
  ) {}

}
