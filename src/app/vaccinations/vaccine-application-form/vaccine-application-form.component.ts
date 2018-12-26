import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vaccine-application-form',
  templateUrl: './vaccine-application-form.component.html',
  styleUrls: ['./vaccine-application-form.component.css']
})
export class VaccineApplicationFormComponent implements OnInit {
  ages = [{ id: 1, name: '1 año' }, { id: 2, name: '2 años' }];
  vaccinations = [{ id: 1, name: 'Pichicata' }, { id: 2, name: 'Otra pichicata' }];
  doses = [{ id: 1, age: 1, vaccine: 1, name: '1° dosis' }, { id: 2, age: 2, vaccine: 2, name: 'Otra dosis' }];
  today = new Date();
  filteredAges = [];
  filteredVaccinations = [];
  filteredDoses = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VaccineApplicationFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    this.filterAges();
  }

  onSubmit(bottomSheetForm: NgForm) {
    this.bottomSheetRef.dismiss({
      bottomSheet: 'vaccineApplication',
      form: bottomSheetForm,
      message: 'La aplicación de la vacuna fue registrada correctamente'
    });
  }

  dismissBottomSheet(bottomSheetForm: NgForm) {
    this.data.vaccineApplication = { id: null, date: new Date(), age: null, vaccine: null, dose: null };
    this.bottomSheetRef.dismiss({
      bottomSheet: 'vaccineApplication'
    });
  }

  filterAges() {
    this.filteredAges = this.ages.filter(age => {
      const fd = this.doses.filter(dose => dose.age === age.id);
      const flag = fd.every(dose => {
        for (const vaccineApplication of this.data.patient.vaccinations) {
          return vaccineApplication.dose !== dose.id;
        }
        return true;
      });
      return fd.length && flag;
    });
  }

  filterVaccinations() {
    this.filteredVaccinations = this.vaccinations.filter(vaccine => {
      const fd = this.doses.filter(dose => dose.vaccine === vaccine.id && dose.age === this.data.vaccineApplication.age.id);
      const flag = fd.every(dose => {
        for (const vaccineApplication of this.data.patient.vaccinations) {
          return vaccineApplication.dose !== dose.id;
        }
        return true;
      });
      return fd.length && flag;
    });
  }

  filterDoses() {
    this.filteredDoses = this.doses.filter(dose => {
      if (dose.vaccine !== this.data.vaccineApplication.vaccine.id || dose.age !== this.data.vaccineApplication.age.id) {
        return false;
      }
      for (const vaccineApplication of this.data.patient.vaccinations) {
        return vaccineApplication.dose !== dose.id;
      }
      return true;
    });
  }

}
