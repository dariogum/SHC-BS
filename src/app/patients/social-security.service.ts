import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class SocialSecurity {
  id: number;
  name: string;
  agreement: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SocialSecurityService {

  constructor(
    private http: HttpClient,
  ) { }

  read(id: number): Observable<any> {
    if (id) {
      return this.http.get<any>(environment.apiURL + `socialsecurities/${id}`);
    }
  }

  readAll(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiURL + `socialsecurities`);
  }
}
