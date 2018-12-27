import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatStepper } from '@angular/material';

import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  @ViewChild(MatStepper) stepper: MatStepper;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  verifyUser(): void {
    this.authenticationService.findByEmail(this.email).subscribe(
      user => {
        if (user.id) {
          this.stepper.next();
        } else {
          this.snackBar.open('Verifique su usuario', 'OK', { duration: 2500 })
        }
      },
      error => {
        return this.snackBar.open('Ocurrió un error al verificar su usuario', 'OK', { duration: 2500 });
      }
    );
  }

  verifyPassword(): void {
    if (this.authenticationService.verifyPassword(this.email, this.password)) {
      this.router.navigate(['patients']);
    } else {
      this.snackBar.open('Verifique su usuario y contraseña', 'OK', { duration: 2500 })
    }
  }

}
