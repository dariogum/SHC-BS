import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class SocialSecurity {
  id: number;
  name: string;
  agreement: boolean;
}

export const SOCIALSECURITIES: SocialSecurity[] = [
  { id: 1, name: 'Obra social de prueba 1', agreement: true },
  { id: 2, name: 'Obra social de prueba 2', agreement: false },
];

@Injectable({
  providedIn: 'root'
})
export class SocialSecurityService {

  constructor() { }

  readAll(): Observable<SocialSecurity[]>{
    return of(SOCIALSECURITIES);
  }
}
