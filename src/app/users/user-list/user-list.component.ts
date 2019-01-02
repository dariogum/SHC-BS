import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { AppService } from './../../app.service';
import { UserFormComponent } from './../user-form/user-form.component';
import { User, UserService } from './../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = new User;
  searching = false;
  searchTerm$ = new Subject<string>();

  constructor(
    private appService: AppService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readUsers();

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => this.searching = true),
      switchMap(term => this.userService.search(term))
    ).subscribe(
      usersData => { this.users = this.usersParser(usersData); this.searching = false; },
      error => { this.snackBar.open('Ocurrió un error al buscar los usuarios', 'OK', { duration: 2500 }); this.searching = false; }
    );
  }

  usersParser(data: any): User[] {
    const users: User[] = [];
    data.forEach((user: any) => {
      users.push(this.appService.userParser(user));
    });
    return users;
  }

  openUserBottomSheet(user: User): void {
    const data = { title: 'Información del usuario', user: user };
    this.appService.openBottomSheet(UserFormComponent, data);
  }

  readUsers(): void {
    this.userService.readAll().subscribe(
      users => this.users = users,
      error => this.snackBar.open('Ocurrió un error al obtener los usuarios', 'OK', { duration: 2500 })
    );
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }

}
