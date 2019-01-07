import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Patient, PatientSocialSecurity, PatientService } from './../patient.service';
import { SocialSecurity, SocialSecurityService } from './../social-security.service';
import { Country, State, City, CountryService } from '../country.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.css']
})
export class PatientPersonalInformationComponent implements OnInit {
  cities: City[] = [];
  countries: Country[] = [];
  filteredSocialSecurities: SocialSecurity[] = [];
  @Input() patient: Patient;
  patientSocialSecurities: PatientSocialSecurity[] = [];
  socialSecurities: SocialSecurity[] = [];
  states: State[] = [];
  today = new Date();

  constructor(
    private appService: AppService,
    private countryService: CountryService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private socialSecurityService: SocialSecurityService,
  ) { }

  ngOnInit() {
    this.readSocialSecurities();
    this.readCountries();
    this.readStates();
    this.readCities();
    this.readPatientSocialSecurities();
  }

  filterSocialSecurities(event): void {
    this.filteredSocialSecurities = this.socialSecurities.filter(
      socialSecurity => socialSecurity.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  displayFn(socialSecurity?: SocialSecurity): string | undefined {
    return socialSecurity ? socialSecurity.name : undefined;
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

  verifySocialSecuritySelection(event) {
    if (typeof event.value === 'string') {
      event.target.setErrors({ notObject: true });
    }
  }

  readSocialSecurities(): void {
    this.socialSecurityService.readAll().subscribe(socialSecurities => this.socialSecurities = socialSecurities);
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
    if (form.form.valid && form.form.dirty) {
      this.updatePatient();
    }
  }

  updatePatient(): void {
    this.patientService.update(this.patient).subscribe(
      _ => { },
      error => this.snackBar.open('Ocurrió un error al modificar los datos del paciente', 'OK', { duration: 2500 })
    );
  }

}
