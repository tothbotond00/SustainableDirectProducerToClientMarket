import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from '../../../shared/common_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '@shared/common_services/category.service';
import { Category } from '@shared/models/category';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  standalone: false
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];

  constructor(private userService: AuthService, private formBuilder: FormBuilder, public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDialogComponent>, private categoryService: CategoryService, @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService) {
    console.log(data);

        this.form = this.formBuilder.group({
        name: [data.name ?? ''],
        description: [data.description ?? ''],
        profession: [data.profession ?? ''],
    });

  }

  ngOnInit(): void {
    this.categoryService.get().subscribe(data => {
      this.categories = data;
    });
  }

  onSave() {
    if (this.form.valid) {
      let dataToSend = {userId: this.authService.getUserId().toString(), ...this.form.value};
      console.log(dataToSend);

      this.dialogRef.close(dataToSend);
    }
  }

  /// Close the dialog
  onCancelClick() {
    this.dialogRef.close();
  }
}
