import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};

export interface User {
  active: boolean;
  createdAt: Date;
  id: number;
  lastname: string;
  name: string;
  password: string;
  role: string;
  updatedAt: Date;
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

  create(user: User): Observable<User> {
    return this.http.post<User>(`users`, user, httpOptions);
  }

  read(id: number): Observable<User> {
    if (id) {
      return this.http.get<User>(`users/${id}`);
    }
  }

  readAll(): Observable<User[]> {
    // return this.http.get<User[]>(`users`);
    return of(USERS);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`users`, user, httpOptions);
  }

  delete(user: User): Observable<{}> {
    return this.http.delete(`users/${user.id}`, httpOptions);
  }
}
