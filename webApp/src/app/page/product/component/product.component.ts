import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {ActivatedRoute} from '@angular/router';
import { ProductReviewService } from '../service/product-review.service';
import { ProductReview } from '@shared/models/productreview';
import { BasketService } from '../../basket/service/basket.service';
import { AuthService } from '@shared/common_services/auth.service';
import { Product } from '@shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false
})
export class ProductComponent implements OnInit{

  // Mock Reviews Data
  // reviews = [
  //   { user: 'Jane Doe', comment: 'Amazing product! The quality is excellent, and the taste is fantastic.' },
  //   { user: 'John Smith', comment: 'Great value for money. Definitely will buy again.' },
  //   { user: 'Anna Taylor', comment: 'Arrived on time and in perfect condition. Highly recommend this seller!' }
  // ];

  reviews: ProductReview[] = [];

  // State for quantity and basket
  quantity: number = 1;
  basket: any[] = []; // Placeholder for basket items

  productId?: number;
  product?: Product;

  //TODO authservice, for reviews
  constructor(private productService: ProductService, private reviewService: ProductReviewService,
              private basketService: BasketService, private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.productId = +(params.get('id')!);

        this.productService.getOne(this.productId.toString()).subscribe(data => {
          this.product = data;
          console.log(data);
          
        });

        this.reviewService.get(this.productId.toString()).subscribe(data => {
          console.log(data);
          this.reviews = data;
        });
      }
    });
  }

  // Handle "Add to Basket" action
  addToBasket(): void {  
    this.basketService.post('', {userId: this.authService.getUserId(), productId: this.product?.id, quantity: this.quantity}).subscribe(data => {
      console.log(data);
    });
  }

  onQuantityChange($event: any): void {
    console.log('Quantity changed:', $event.target.value);
    
    this.quantity = $event.target.value;
  }

  // Placeholder for future review-related functionality
  onReviewSubmit(review: string): void {
    console.log('New review submitted:', review);
  }
}
