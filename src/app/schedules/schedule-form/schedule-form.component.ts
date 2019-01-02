import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { Schedule, ScheduleService } from './../schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ScheduleFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.data.schedule.id) {
      this.createSchedule();
    } else {
      this.updateSchedule();
    }
  }

  createSchedule(): void {
    this.scheduleService.create(this.data.schedule).subscribe(
      schedule => {
        this.dismissBottomSheet('La agenda fue registrada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar la agenda', 'OK', { duration: 2500 })
    );
  }

  updateSchedule(): void {
    this.scheduleService.update(this.data.schedule).subscribe(
      schedule => {
        this.dismissBottomSheet('La agenda fue modificada correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar la agenda', 'OK', { duration: 2500 })
    );
  }

  dismissBottomSheet(message: string): void {
    this.data.schedule = new Schedule;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'schedule',
      message: message
    });
  }

  deleteSchedule(): void {
    const dialogRef = this.dialog.open(ScheduleDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.scheduleService.delete(this.data.schedule).subscribe(
          _ => {
            this.dismissBottomSheet('La agenda fue eliminada correctamente');
          },
          error => this.snackBar.open('Ocurrió un error al eliminar la agenda', 'OK', { duration: 2500 })
        );
      }
    });
  }

}

@Component({
  selector: 'app-schedule-delete-dialog',
  template: `
  <h1 mat-dialog-title>Eliminar la agenda</h1>
  <mat-dialog-content>
  <p>La agenda será eliminada. ¿Seguro?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Sí</button>
    <button mat-button color="warn" [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>
  `,
})
export class ScheduleDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ScheduleDeleteComponent>
  ) {}

}
