import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {
  today = new Date();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VisitFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'visit',
      form: bottomSheetForm,
      message: 'La visita fue creada correctamente'
    });
  }

  dismissBottomSheet() {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'visit'
    });
  }

}
