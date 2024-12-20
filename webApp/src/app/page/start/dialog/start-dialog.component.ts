import { Component } from '@angular/core';
import { AuthService } from '../../../shared/common_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrl: './start-dialog.component.css',
  standalone: false
})
export class StartDialogComponent {

  form!: FormGroup;
  errorMessage: string = '';
  success: Boolean = false;
  hide = true;
  buttonText: string = 'Create account';
  disabledButton: boolean = false;

  constructor(private userService: AuthService, private formBuilder: FormBuilder, public dialog: MatDialog,
    public dialogRef: MatDialogRef<StartDialogComponent>) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      isCustomer: ['true'],
      fullName: ['', []],
      taxNumber: ['', []],
      address: ['', []],
    });

    this.onIsCustomerChange();
  }

  onIsCustomerChange() {
    console.log('onIsCustomerChange');
    
    this.form.get('isCustomer')?.valueChanges.subscribe((value) => {
      if (value === 'false') {
        // Validátorok beállítása, ha isCustomer false
        this.form.get('fullName')?.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
        this.form.get('taxNumber')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
        this.form.get('address')?.setValidators([Validators.required]);
      } else {
        // Validátorok törlése, ha isCustomer true
        this.form.get('fullName')?.clearValidators();
        this.form.get('taxNumber')?.clearValidators();
        this.form.get('address')?.clearValidators();
      }
      // Érvényesség frissítése
      this.form.get('fullName')?.updateValueAndValidity();
      this.form.get('taxNumber')?.updateValueAndValidity();
      this.form.get('address')?.updateValueAndValidity();
    });
  }

  /// Signup the user
  onSignupClick() {
    this.buttonText = 'Loading...';
    this.disabledButton = true;
    
    let dataToSend : any = {
      email: this.form.controls['email'].value,
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      isCustomer: this.form.controls['isCustomer'].value === 'true' ? true : false
    }

    setTimeout(() => {
      this.userService.post('Signup', dataToSend).subscribe({
        next: data => {
          this.success = true;
          setTimeout(() => {
            this.dialogRef.close();
          }, 3000);
        },
        error: error => {
          this.errorMessage = error.error;
          this.disabledButton = false;
          this.buttonText = 'Create account';

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }, 3000);

  }

  /// Close the dialog
  onCancelClick() {
    this.dialogRef.close();
  }
}
