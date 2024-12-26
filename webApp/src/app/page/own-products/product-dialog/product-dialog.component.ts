import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {CategoryService} from '@shared/common_services/category.service';
import {Category} from '../../../models/category';
import { Product } from '@shared/models/product';


@Component({
  selector: 'app-product-dialog',
  standalone: false,

  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit{

  product?: Product = undefined
  form!: FormGroup;
  buttonText: string = 'Add product';
  disabledButton: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  categories: Category[] = [];

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private authService: AuthService,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { product?: Product }) {

    this.product = data.product;
    if (this.product) this.buttonText = 'Update product';
    this.form = this.formBuilder.group({
      name: [this.product?.name ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: [this.product?.description ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      categoryId: [this.product?.categoryId ?? '', [Validators.required]],
      price: [this.product?.price ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: [this.product?.stock ?? '', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
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
      if (!this.product) {
        this.productService.post('', newProduct).subscribe({
          next: data => {
            this.success = true;
            setTimeout(() => {
              this.dialogRef.close(true);
            }, 1500);
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.error;
            this.disabledButton = false;
            this.buttonText = 'Add product';

            setTimeout(() => {
              this.errorMessage = '';
            }, 1500);
          }
        });
      }
      else {
        this.productService.put(this.product.id.toString(), newProduct).subscribe({
          next: data => {
            this.success = true;
            setTimeout(() => {
              this.dialogRef.close(true);
            }, 1500);
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.error;
            this.disabledButton = false;
            this.buttonText = 'Update product';

            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        });
      }
    }, 3000);
  }

  close() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.categoryService.get('').subscribe(data => {
      this.categories = data;
    });
  }

}
