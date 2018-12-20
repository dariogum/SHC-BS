import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PatientFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'patient',
      form: bottomSheetForm,
      message: 'El paciente fue registrado correctamente'
    });
  }

  dismissBottomSheet(bottomSheetForm: NgForm) {
    bottomSheetForm.resetForm();
    this.bottomSheetRef.dismiss({
      bottomSheet: 'patient'
    });
  }

}
