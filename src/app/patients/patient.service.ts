import { Injectable } from '@angular/core';

export interface Patient {
  id: number;
  lastname: string;
  name: string;
}

export const PATIENTS: Patient[] = [
  {id: 1, lastname: 'De Prueba 1', name: 'Paciente'},
  {id: 2, lastname: 'De Prueba 2', name: 'Paciente'},
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }
}
