import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

export interface Patient {
  id: number;
  lastname: string
  name: string;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  today = new Date();
  patients: Patient[] = [
    { id: 1, lastname: 'Apellido1', name: 'Nombre1' },
    { id: 2, lastname: 'Apellido2', name: 'Nombre2' }
  ];
  filteredPatients: Patient[];
  professionals = [
    { id: 1, lastname: 'Profe1', name: 'Sional1' },
    { id: 2, lastname: 'Profe2', name: 'Sional2' }
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppointmentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  filterPatients(event) {
    this.filteredPatients = this.patients.filter(patient => {
      return (patient.lastname.toLowerCase().includes(event.target.value.toLowerCase()) || patient.name.toLowerCase().includes(event.target.value.toLowerCase()));
    });
  }

  displayFn(patient?: Patient): string | undefined {
    return patient ? patient.lastname + ' ' + patient.name : undefined;
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'appointment',
      form: bottomSheetForm,
      message: 'El turno fue registrado correctamente'
    });
  }

  dismissBottomSheet(bottomSheetForm: NgForm) {
    bottomSheetForm.resetForm();
    this.bottomSheetRef.dismiss({
      bottomSheet: 'appointment'
    });
  }

}
