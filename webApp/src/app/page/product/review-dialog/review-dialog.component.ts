import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '@shared/models/product';
import {ProductReviewService} from '../service/product-review.service';

@Component({
  selector: 'app-review-dialog',
  standalone: false,

  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {

  product!: Product;
  form!: FormGroup;
  errorMessage: string = '';
  disabledButton: boolean = false;
  buttonText: string = 'Értékelés hozzáadása';
  success: boolean = false;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { product: Product },
              private dialogRef: MatDialogRef<ReviewDialogComponent>,
              private reviewService: ProductReviewService) {

    this.product = data.product;
    this.form = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  setRating(rating: number): void {
    this.form.get('rating')?.setValue(rating);
  }

  onAddReviewClick(){
    this.buttonText = 'Töltés...';
    this.disabledButton = true;

    setTimeout(() => {
      this.reviewService.post('', {
        productId: this.product.id,
        rating: this.form.get('rating')?.value,
        description: this.form.get('description')?.value
      }).subscribe({
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
          this.buttonText = 'Értékelés hozzáadása';

          setTimeout(() => {
            this.errorMessage = '';
          }, 1500);
        }
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

}
