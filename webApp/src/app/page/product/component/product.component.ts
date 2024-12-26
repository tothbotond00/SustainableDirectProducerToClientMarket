import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {Product} from '../../../models/product';
import {ActivatedRoute} from '@angular/router';
import { ProductReviewService } from '../service/product-review.service';
import { ProductReview } from '@shared/models/productreview';

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
    /*const basketItem = { //TODO
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      total: this.quantity * this.product.price
    };

    // Add the item to the basket
    this.basket.push(basketItem);
    console.log('Basket updated:', this.basket);

    // Show feedback to the user
    alert(`Added ${this.quantity} of "${this.product.name}" to the basket.`);*/
  }

  // Placeholder for future review-related functionality
  onReviewSubmit(review: string): void {
    console.log('New review submitted:', review);
  }
}
