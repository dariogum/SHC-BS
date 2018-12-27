import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { VitalSigns, VitalSignsService } from './../vital-signs.service';

@Component({
  selector: 'app-vital-signs-form',
  templateUrl: './vital-signs-form.component.html',
  styleUrls: ['./vital-signs-form.component.css']
})
export class VitalSignsFormComponent implements OnInit {
  today = new Date();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VitalSignsFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private vitalSignsRecordService: VitalSignsService,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.data.vitalSignsRecord.id) {
      this.createVitalSigns();
    } else {
      this.updateVitalSigns();
    }
  }

  createVitalSigns(): void {
    this.vitalSignsRecordService.create(this.data.vitalSignsRecord).subscribe(
      vitalSignsRecord => {
        this.dismissBottomSheet('Los signos vitales fueron registrados correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar los signos vitales', 'OK', { duration: 2000 })
    );
  }

  updateVitalSigns(): void {
    this.vitalSignsRecordService.update(this.data.vitalSignsRecord).subscribe(
      vitalSignsRecord => {
        this.dismissBottomSheet('El registro de los signos vitales fuer modificado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar el registro de los signos vitales', 'OK', { duration: 2000 })
    );
  }

  deleteVitalSigns(): void {
    const dialogRef = this.dialog.open(VitalSignsDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.vitalSignsRecordService.delete(this.data.vitalSignsRecord).subscribe(
          _ => {
            this.dismissBottomSheet('El registro de signos vitales fue eliminado correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al eliminar el registro de signos vitales', 'OK', { duration: 2000 })
        );
      }
    });
  }

  dismissBottomSheet(message: string): void {
    this.data.vitalSignsRecord = new VitalSigns;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'vitalSignsRecord',
      message: message
    });
  }
}

@Component({
  selector: 'app-vital-signs-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar el registro</h1>
  <mat-dialog-content>
  <p>El registro será eliminado. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class VitalSignsDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<VitalSignsDeleteComponent>
  ) {}

}
