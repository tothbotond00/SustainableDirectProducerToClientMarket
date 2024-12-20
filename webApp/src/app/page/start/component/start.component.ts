import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@shared/common_services/auth.service';
import { StartDialogComponent } from '../dialog/start-dialog.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
  standalone: false
})
export class StartComponent implements OnInit{

  form!: FormGroup;
  errorMessage: string = '';
  disabledButton: boolean = false;
  buttonText: string = 'Sign in';
  hide: boolean = true;

  constructor(public router: Router, private dialog: MatDialog,
    public formBuilder: FormBuilder, public auth: AuthService) {
    this.form = formBuilder.group({
      email: [''],
      password: ['']
    });

  }

  ngOnInit(): void {
      localStorage.clear();
  }

  /// Login the user
  onLoginClick() {

    this.disabledButton = true;
    this.buttonText = 'Loading...'

    setTimeout(() => {

      this.auth.post("Login", this.form.value).subscribe({
        next: data => {
          this.auth.get('', { email: this.form.value.email }).subscribe({
            next: () => {
              location.href = '/example';
            }
          })
        },
        error: error => {
          this.errorMessage = error.error;
          this.disabledButton = false;
          this.buttonText = 'Sign in';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);

        }
      });

    }, 500);

  }

  /// Open the dialog for the signup
  redirectToSignup() {
    this.dialog.open(StartDialogComponent,
      {
        width: '550px',
        disableClose: true
      });
  }

}
