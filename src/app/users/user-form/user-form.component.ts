import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';

import { User, UserService } from './../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.roles = this.userService.readRoles();
  }

  onSubmit(): void {
    if (!this.data.user.id) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser(): void {
    this.userService.create(this.data.user).subscribe(
      user => {
        this.dismissBottomSheet('El usuario fue registrado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al registrar el usuario', 'OK', { duration: 2000 })
    );
  }

  updateUser(): void {
    this.userService.update(this.data.user).subscribe(
      user => {
        this.dismissBottomSheet('El usuario fue modificado correctamente');
      },
      error => this.snackBar.open('Ocurrió un error al modificar el usuario', 'OK', { duration: 2000 })
    );
  }

  dismissBottomSheet(message: string): void {
    this.data.user = new User;
    this.bottomSheetRef.dismiss({
      bottomSheet: 'user',
      message: message
    });
  }

}
