import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductReviewService } from '../service/product-review.service';
import { ProductReview } from '@shared/models/productreview';
import { BasketService } from '../../basket/service/basket.service';
import { AuthService } from '@shared/common_services/auth.service';
import { Product } from '@shared/models/product';
import {MatDialog} from '@angular/material/dialog';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';
import {ConfirmDeletionDialogComponent} from '../../../confirm-deletion-dialog/confirm-deletion-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false
})
export class ProductComponent implements OnInit{

  reviews: ProductReview[] = [];
  userHasReview: boolean = false;

  // State for quantity and basket
  quantity: number = 1;
  basket: any[] = []; // Placeholder for basket items

  productId?: number;
  product?: Product;
  image?: string = undefined;

  userId!: number;

  //TODO no rating if not logged in, or producer
  constructor(private productService: ProductService,
              private reviewService: ProductReviewService,
              private basketService: BasketService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.productId = +(params.get('id')!);

        this.productService.getProductById(this.productId).subscribe(data => {
          this.product = data;
          console.log(data);
        });

        this.reviewService.get(this.productId.toString()).subscribe(data => {
          console.log(data);
          this.reviews = data;

          this.userId = this.authService.getUserId();
          if (this.reviews.find(r => r.userId == this.userId))
            this.userHasReview = true;
        });
      }
    });
  }

  // Handle "Add to Basket" action
  addToBasket(): void {
    this.basketService.post('', {userId: this.authService.getUserId(), productId: this.product?.id, quantity: this.quantity}).subscribe(data => {
      alert(data);
    });
  }

  onQuantityChange($event: any): void {
    console.log('Quantity changed:', $event.target.value);

    this.quantity = $event.target.value;
  }

  onAddReview(): void {
    const dialogRef = this.dialog.open(
      ReviewDialogComponent,
      {
        width: '550px',
        disableClose: true,
        data: { product: this.product }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (this.productId) {
        this.reviewService.get(this.productId.toString()).subscribe(data => {
          this.reviews = data;
          this.userHasReview = true;
        });
      }
    });
  }

  deleteReview(reviewId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent,
      {
        width: '500px',
        disableClose: true,
        data: { subject: 'értékelés' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.delete('', reviewId).subscribe(() => {
          this.reviews = this.reviews.filter(p => p.id != reviewId);
          this.userHasReview = false;
        });
      }
    });
  }

  redirectToProducer(producerId: number): void {
    this.router.navigate(['/user', producerId]);
  }
}
