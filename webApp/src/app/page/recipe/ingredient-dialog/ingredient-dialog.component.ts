import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../product/service/product.service';
import {Product} from '@shared/models/product';

@Component({
  selector: 'app-ingredient-dialog',
  standalone: false,

  templateUrl: './ingredient-dialog.component.html',
  styleUrl: './ingredient-dialog.component.scss'
})
export class IngredientDialogComponent implements OnInit {

  form!: FormGroup;
  products: Product[] = [];
  disabledButton: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  buttonText: string = 'Összetevő hozzáadása';

  constructor(private dialogRef: MatDialogRef<IngredientDialogComponent>,
              private formBuilder: FormBuilder,
              private productService: ProductService) {

    this.form = this.formBuilder.group({
      type: [''],
      name: [''],
      productId: ['']
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  onAddIngredientClick() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {
    this.productService.get().subscribe(data => {
      this.products = data;
    });
  }
}
