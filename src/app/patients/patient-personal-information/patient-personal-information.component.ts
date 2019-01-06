import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Patient, PatientService } from './../patient.service';
import { SocialSecurity, SocialSecurityService } from './../social-security.service';
import { Country, State, City, CountryService } from '../country.service';

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
  socialSecurities: SocialSecurity[] = [];
  states: State[] = [];
  today = new Date();

  constructor(
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
  }

  filterSocialSecurities(event): void {
    this.filteredSocialSecurities = this.socialSecurities.filter(
      socialSecurity => socialSecurity.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  displayFn(socialSecurity?: SocialSecurity): string | undefined {
    return socialSecurity ? socialSecurity.name : undefined;
  }

  verifySocialSecuritySelection(form: NgForm) {
    if (typeof this.patient.socialSecurity1 === 'string') {
      form.form.controls['socialSecurity1'].setErrors({ notObject: true });
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
