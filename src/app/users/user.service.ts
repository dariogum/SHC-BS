import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};

export interface User {
  id: number;
  name: string;
  lastname: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export const USERS: User[] = [
  {
    active: true,
    createdAt: new Date(),
    id: 1,
    lastname: 'De Prueba',
    name: 'Médico 1',
    password: '',
    role: 'medic',
    updatedAt: new Date(),
  },
  {
    active: true,
    createdAt: new Date(),
    id: 2,
    lastname: 'De Prueba',
    name: 'Médico 2',
    password: '',
    role: 'medic',
    updatedAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  readAll(): Observable<User[]> {
    // return this.http.get<User[]>(`users`);
    return of(USERS);
  }
}
