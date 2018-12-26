import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vital-signs-form',
  templateUrl: './vital-signs-form.component.html',
  styleUrls: ['./vital-signs-form.component.css']
})
export class VitalSignsFormComponent implements OnInit {
  today = new Date();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VitalSignsFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'vitalSigns',
      form: bottomSheetForm,
      message: 'Los signos vitales fueron registrados correctamente'
    });
  }

  dismissBottomSheet(bottomSheetForm: NgForm) {
    this.data.vitalSignsRecord = { id: null, date: new Date(), bloodPressure: null, heartRate: null, temperature: null, breathingFrequency: null };    
    this.bottomSheetRef.dismiss({
      bottomSheet: 'vitalSigns'
    });
  }

}
