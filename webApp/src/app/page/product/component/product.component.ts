import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false
})
export class ProductComponent implements OnInit{

  product = {
    id: 1,
    name: 'Organic Honey',
    price: 15.99,
    image: '/assets/sample-product.jpg',
    description: 'High-quality organic honey from sustainable sources.'
  };

  // Mock Reviews Data
  reviews = [
    { user: 'Jane Doe', comment: 'Amazing product! The quality is excellent, and the taste is fantastic.' },
    { user: 'John Smith', comment: 'Great value for money. Definitely will buy again.' },
    { user: 'Anna Taylor', comment: 'Arrived on time and in perfect condition. Highly recommend this seller!' }
  ];

  // State for quantity and basket
  quantity: number = 1;
  basket: any[] = []; // Placeholder for basket items

  dataFromService: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.productService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }

  // Handle "Add to Basket" action
  addToBasket(): void {
    const basketItem = {
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
    alert(`Added ${this.quantity} of "${this.product.name}" to the basket.`);
  }

  // Placeholder for future review-related functionality
  onReviewSubmit(review: string): void {
    console.log('New review submitted:', review);
  }
}
