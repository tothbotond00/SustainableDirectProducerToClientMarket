import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { ExampleData } from '../../models/exampledata';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  standalone: false
})
export class BasketComponent implements OnInit{

  basketItems = [
    {
      id: 1,
      name: 'Organic Honey',
      price: 15.99,
      quantity: 2,
      image: '/assets/honey.jpg'
    },
    {
      id: 2,
      name: 'Fresh Almonds',
      price: 12.49,
      quantity: 1,
      image: '/assets/honey.jpg'
    },
    {
      id: 3,
      name: 'Artisan Bread',
      price: 5.99,
      quantity: 3,
      image: '/assets/honey.jpg'
    }
  ];

  dataFromService: ExampleData[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
      this.basketService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);  
      });
  }

  // Calculate the total price for all items in the basket
  calculateTotalPrice(): number {
    return this.basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Placeholder for checkout functionality
  proceedToCheckout(): void {
    console.log('Proceeding to checkout with items:', this.basketItems);
    alert('Checkout functionality will be implemented here.');
  }
}
