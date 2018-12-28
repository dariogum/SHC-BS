import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Country {
  id: number;
  name: string;
}

export class State {
  id: number;
  name: string;
  country: Country;
}

export class City {
  id: number;
  name: string;
  state: State;
  zipCode: string;
}

export const COUNTRIES: Country[] = [
  { id: 1, name: "Argentina"},
];

export const STATES: State[] = [
  { id: 1, name: "Santa Fe", country: COUNTRIES[0] },
];

export const CITIES: City[] = [
  { id: 1, name: "Santa Fe", state: STATES[0], zipCode: "3000" },
];

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  readAllCountries(): Observable<Country[]>{
    return of(COUNTRIES);
  }

  readAllStates(): Observable<State[]>{
    return of(STATES);
  }

  readAllCities(): Observable<City[]>{
    return of(CITIES);
  }
}
