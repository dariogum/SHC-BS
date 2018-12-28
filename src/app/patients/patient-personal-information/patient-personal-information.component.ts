import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Patient, PatientService, BirthType } from './../patient.service';
import { SocialSecurity, SocialSecurityService } from './../social-security.service';
import { Country, State, City, CountryService } from '../country.service';

@Component({
  selector: 'app-patient-personal-information',
  templateUrl: './patient-personal-information.component.html',
  styleUrls: ['./patient-personal-information.component.css']
})
export class PatientPersonalInformationComponent implements OnInit {
  birthTypes: BirthType[] = [];
  cities: City[] = [];
  countries: Country[] = [];
  filteredSocialSecurities: SocialSecurity[] = [];
  patient: Patient = new Patient;
  socialSecurities: SocialSecurity[] = [];
  states: State[] = [];

  constructor(
    private patientService: PatientService,
    private socialSecurityService: SocialSecurityService,
    private countryService: CountryService,
  ) { }

  ngOnInit() {
    this.readSocialSecurities();
    this.readCountries();
    this.readStates();
    this.readCities();
    this.readBirthTypes();
  }

  filterSocialSecurities(event): void {
    this.filteredSocialSecurities = this.socialSecurities.filter(socialSecurity => socialSecurity.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  displayFn(socialSecurity?: SocialSecurity): string | undefined {
    return socialSecurity ? socialSecurity.name : undefined;
  }

  verifySocialSecuritySelection(form: NgForm) {
    if (typeof this.patient.socialSecurity1 === 'string') {
      form.form.controls['socialSecurity1'].setErrors({notObject: true});
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

  readBirthTypes(): void {
    this.patientService.readAllBirthTypes().subscribe(birthType => this.birthTypes = birthType);
  }

}