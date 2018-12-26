import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { Visit, VisitService } from './../visit.service';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {
  today = new Date();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VisitFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private visitService: VisitService,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.data.visit.id) {
      this.createVisit();
    } else {
      this.updateVisit();
    }
  }

  createVisit(): void {
    this.visitService.create(this.data.visit).subscribe(
      visit => {
        this.dismissBottomSheet('La visita fue registrada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar la visita', 'OK', { duration: 2000 })
    );
  }

  updateVisit(): void {
    this.visitService.update(this.data.visit).subscribe(
      visit => {
        this.dismissBottomSheet('La visita fue modificada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar la visita', 'OK', { duration: 2000 })
    );
  }

  deleteVisit(): void {
    const dialogRef = this.dialog.open(VisitDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.visitService.delete(this.data.visit).subscribe(
          _ => {
            this.dismissBottomSheet('La visita fue eliminada correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al eliminar la visita', 'OK', { duration: 2000 })
        );
      }
    });
  }

  dismissBottomSheet(message: string): void {
    this.data.visit = new Visit;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'visit',
      message: message
    });
  }
}

@Component({
  selector: 'app-visit-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar la visita</h1>
  <mat-dialog-content>
  <p>La visita será eliminada. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class VisitDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<VisitDeleteComponent>
  ) {}

}
