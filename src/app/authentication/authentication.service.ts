import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User, UserService } from './../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  findByEmail(email: string): Observable<User> {
    email = email.toLowerCase().trim();
    if (email.length) {
      return this.http.get<User>(`users/findByEmail/${email}`);
    }
  }

  verifyPassword(email: string, password: string): boolean {
    email = email.toLowerCase().trim();
    if (email.length && password.length) {
      return true;
    }
    return false;
  }
}
