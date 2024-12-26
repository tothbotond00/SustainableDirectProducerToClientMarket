import { Component, OnInit } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { AuthService } from '@shared/common_services/auth.service';
import { Basket } from '@shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  standalone: false
})
export class BasketComponent implements OnInit{

  // basketItems = [
  //   {
  //     id: 1,
  //     name: 'Organic Honey',
  //     price: 15.99,
  //     quantity: 2,
  //     image: '/assets/honey.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Fresh Almonds',
  //     price: 12.49,
  //     quantity: 1,
  //     image: '/assets/honey.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: 'Artisan Bread',
  //     price: 5.99,
  //     quantity: 3,
  //     image: '/assets/honey.jpg'
  //   }
  // ];

  dataFromService: Basket = new Basket();

  constructor(private basketService: BasketService, private authService: AuthService) { }

  ngOnInit(): void {
    let userId: number = this.authService.getUserId();

      this.basketService.getOne(userId.toString()).subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);  
      });
  }

  // Calculate the total price for all items in the basket
  calculateTotalPrice() {
    // return this.basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return this.dataFromService.totalPrice;
  }

  onQuantityChange(event: any, productId: number): void {
    this.basketService.put('', {productId: productId, quantity: event.target.value, userId: this.authService.getUserId()})
    .subscribe(data => {
      this.basketService.getOne(this.authService.getUserId().toString()).subscribe(data => {
        this.dataFromService = data;
      });
    });
  }

  removeFromBasket(productId: number): void {
    this.basketService.delete(this.authService.getUserId().toString(), productId).subscribe(data => {
      this.basketService.getOne(this.authService.getUserId().toString()).subscribe(data => {
        this.dataFromService = data;
      });
    });
  }

  // Placeholder for checkout functionality
  proceedToCheckout(): void {
    // console.log('Proceeding to checkout with items:', this.basketItems);
    // alert('Checkout functionality will be implemented here.');

    let userId = this.authService.getUserId();
    this.basketService.post('send', Number(userId)).subscribe(data => {
      this.basketService.getOne(userId.toString()).subscribe(data => {
        this.dataFromService = data;
      });
      alert(data);
    });
  }
}
