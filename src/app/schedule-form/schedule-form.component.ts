import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ScheduleFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'schedule',
      form: bottomSheetForm,
      message: 'La agenda fue creada correctamente'
    });
  }

  dismissBottomSheet(bottomSheetForm: NgForm) {
    bottomSheetForm.resetForm();
    this.bottomSheetRef.dismiss({
      bottomSheet: 'schedule'
    });
  }

}
