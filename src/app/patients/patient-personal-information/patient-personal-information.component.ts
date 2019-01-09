import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Patient, PatientSocialSecurity, PatientService } from './../patient.service';
import { SocialSecurity, SocialSecurityService } from './../social-security.service';
import { Country, State, City, CountryService } from '../country.service';
import { AppService } from 'src/app/app.service';
import { PatientSocialSecurityFormComponent } from './../patient-social-security-form/patient-social-security-form.component';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.css']
})
export class PatientPersonalInformationComponent implements OnInit {
  cities: City[] = [];
  countries: Country[] = [];
  newPatientSocialSecurity: PatientSocialSecurity = new PatientSocialSecurity;
  @Input() patient: Patient;
  patientSocialSecurities: PatientSocialSecurity[] = [];
  states: State[] = [];
  today = new Date();

  constructor(
    private appService: AppService,
    private countryService: CountryService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readCountries();
    this.readStates();
    this.readCities();
    this.readPatientSocialSecurities();
  }

  readPatientSocialSecurities() {
    this.patientService.readPatientSocialSecurities(this.patient).subscribe(
      patientSocialSecurities => this.patientSocialSecurities = this.patientSocialSecuritiesParser(patientSocialSecurities)
    );
  }

  patientSocialSecuritiesParser(patientsSocialSecuritiesData: any): PatientSocialSecurity[] {
    const patientSocialSecurities: PatientSocialSecurity[] = [];
    if (patientsSocialSecuritiesData.data) {
      patientsSocialSecuritiesData.data.forEach((patientSocialSecurity: any) => {
        patientSocialSecurities.push(this.appService.patientSocialSecurityParser(patientSocialSecurity, this.patient));
      });
    }
    return patientSocialSecurities;
  }

  readCountries(): void {
    this.countryService.readAllCountries().subscribe(countries => this.countries = countries);
  }

  readStates(): void {
    this.countryService.readAllStates().subscribe(states => this.states = states);
  }

  readCities(): void {
    this.countryService.readAllCities().subscribe(cities => this.cities = cities);
  }

  update(form: NgForm): void {
    if (form.form.valid && !form.form.pristine) {
      this.updatePatient();
    }
  }

  updatePatient(): void {
    this.patientService.update(this.patient).subscribe(
      _ => { },
      error => this.snackBar.open('Ocurrió un error al modificar los datos del paciente', 'OK', { duration: 2500 })
    );
  }

  openPatientSocialSecurityBottomSheet(patientSocialSecurity: PatientSocialSecurity) {
    const data = {
      title: 'Información de la obra social del paciente',
      patient: this.patient,
      patientSocialSecurity: patientSocialSecurity,
    };
    this.appService.openBottomSheet(PatientSocialSecurityFormComponent, data);
  }

}
