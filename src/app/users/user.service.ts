import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Role {
  id: number;
  codeName: string;
  name: string;
}

const ROLES: Role[] = [
  { id: 1, codeName: 'medic', name: 'Médico' },
  { id: 2, codeName: 'administrator', name: 'Administrador' },
  { id: 3, codeName: 'administrative', name: 'Administrativo' },
];

export class User {
  active: boolean;
  createdAt: Date;
  email: string;
  id: number;
  lastname: string;
  name: string;
  password: string;
  role: Role;
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.active = true;
  }
}

export const USERS: User[] = [
  {
    active: true,
    createdAt: new Date(),
    email: 'medico1@shc.com',
    id: 1,
    lastname: 'De Prueba',
    name: 'Médico 1',
    password: '',
    role: ROLES[0],
    updatedAt: new Date(),
  },
  {
    active: true,
    createdAt: new Date(),
    email: 'medico2@shc.com',
    id: 2,
    lastname: 'De Prueba',
    name: 'Médico 2',
    password: '',
    role: ROLES[0],
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

  search(term: string): Observable<User[]> {
    term = term.trim().toLowerCase();
    if (term.length) {
      return this.http.get<User[]>(`users/search/${term}`);
    }
    return of([new User]);
  }

  readRoles(): any[] {
    return ROLES;
  }
}
