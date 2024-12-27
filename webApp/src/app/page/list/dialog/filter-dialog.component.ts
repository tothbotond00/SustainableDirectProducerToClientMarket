import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../shared/common_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '@shared/common_services/category.service';
import { Category } from '@shared/models/category';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
  standalone: false
})
export class FilterDialogComponent {

  form!: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];

  constructor(private userService: AuthService, private formBuilder: FormBuilder, public dialog: MatDialog,
    public dialogRef: MatDialogRef<FilterDialogComponent>, private categoryService: CategoryService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
        category: [data.category ?? ''],
        minPrice: [data.minPrice ?? ''],
        maxPrice: [data.maxPrice ?? ''],
        prodName: [data.prodName ?? ''],
        priceAsc: [data.priceAsc ?? false],
    });

  }

  ngOnInit(): void {
    this.categoryService.get().subscribe(data => {
      this.categories = data;
    });
  }

  onSave() {
    if (this.form.valid) {
      console.log(this.form.value);
      
      this.dialogRef.close(this.form.value);
    }
  }

  onClear() {
    this.form.get('category')?.setValue('');
    this.form.get('minPrice')?.setValue('');
    this.form.get('maxPrice')?.setValue('');
    this.form.get('prodName')?.setValue('');
    this.form.get('priceAsc')?.setValue(false);
  }

  /// Close the dialog
  onCancelClick() {
    this.dialogRef.close();
  }
}
