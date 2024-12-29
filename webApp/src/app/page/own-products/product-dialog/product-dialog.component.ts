import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {CategoryService} from '@shared/common_services/category.service';
import { Product } from '@shared/models/product';
import { Category } from '@shared/models/category';


@Component({
  selector: 'app-product-dialog',
  standalone: false,

  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit{

  product?: Product = undefined;
  form!: FormGroup;
  buttonText: string = 'Termék hozzáadása';
  disabledButton: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  categories: Category[] = [];
  selectedFile?: File;

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
      image: [''],
      categoryId: [this.product?.categoryId ?? '', [Validators.required]],
      price: [this.product?.price ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: [this.product?.stock ?? '', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })
  }

  onAddProductClick() {
    if (!this.product && !this.selectedFile) {
      this.form.controls['image'].setErrors({ 'incorrect': true });
      this.errorMessage = 'Új termék esetén meg kell adni egy képet!';
      return;
    }
    this.buttonText = 'Betöltés...';
    this.disabledButton = true;

    const formData = new FormData();
    formData.append('name', this.form.controls['name'].value);
    formData.append('description', this.form.controls['description'].value);
    formData.append('price', this.form.controls['price'].value);
    formData.append('stock', this.form.controls['stock'].value);
    formData.append('userId', this.authService.getUserId().toString());
    formData.append('categoryId', this.form.controls['categoryId'].value);
    if (this.selectedFile) formData.append('image', this.selectedFile as Blob);

    setTimeout(() => {
      if (!this.product) {
        this.productService.post('', formData).subscribe({
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
        this.productService.put(this.product.id.toString(), formData).subscribe({
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.form.controls['image'].setErrors({ 'incorrect': true });
        return;
      }
      this.form.controls['image'].setErrors(null);
      this.selectedFile = file;
    }
  }

}
