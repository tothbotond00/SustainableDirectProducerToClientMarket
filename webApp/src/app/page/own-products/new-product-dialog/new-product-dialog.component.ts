import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {CategoryService} from '@shared/common_services/category.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-new-product-dialog',
  standalone: false,

  templateUrl: './new-product-dialog.component.html',
  styleUrl: './new-product-dialog.component.scss'
})
export class NewProductDialogComponent implements OnInit{

  form!: FormGroup;
  buttonText: string = 'Add product';
  disabledButton: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  categories: Category[] = [];

  constructor(private dialogRef: MatDialogRef<NewProductDialogComponent>,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private authService: AuthService,
              private categoryService: CategoryService) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    }) //TODO image?
  }

  onAddProductClick() {
    this.buttonText = 'Loading...';
    this.disabledButton = true;

    const newProduct: any = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      price: this.form.controls['price'].value,
      stock: this.form.controls['stock'].value,
      userId: this.authService.getUserId(),
      categoryId: this.form.controls['categoryId'].value
    }

    console.log(newProduct);

    setTimeout(() => {
      this.productService.post('', newProduct).subscribe({
        next: data => {
          this.success = true;
          setTimeout(() => {
            this.dialogRef.close();
          }, 3000);
        },
        error: error => {
          console.log(error);
          this.errorMessage = error.error;
          this.disabledButton = false;
          this.buttonText = 'Add product';

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }, 3000);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.categoryService.get('').subscribe(data => {
      this.categories = data;
    });
  }

}
