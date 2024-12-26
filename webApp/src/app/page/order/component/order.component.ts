import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ExampleData } from '../../../shared/models/exampledata';
import { AuthService } from '../../../shared/common_services/auth.service';
import { Order } from '@shared/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  standalone: false
})
export class OrderComponent implements OnInit{

  // Mock orders data //TODO from api
  // orders = [
  //   {
  //     id: 1,
  //     userName: 'Jane Doe',
  //     userEmail: 'jane.doe@example.com',
  //     items: [
  //       { name: 'Organic Honey', quantity: 2, price: 15.99 },
  //       { name: 'Artisan Bread', quantity: 1, price: 5.99 }
  //     ],
  //     totalPrice: 37.97, // Pre-calculated for now
  //     isSent: false
  //   },
  //   {
  //     id: 2,
  //     userName: 'John Smith',
  //     userEmail: 'john.smith@example.com',
  //     items: [
  //       { name: 'Fresh Almonds', quantity: 3, price: 12.49 },
  //       { name: 'Organic Milk', quantity: 1, price: 4.99 }
  //     ],
  //     totalPrice: 41.46, // Pre-calculated for now
  //     isSent: false
  //   }
  // ];

  dataFromService: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
      this.orderService.get(this.authService.getUserId().toString()).subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }

  // Mark an order as sent
  markAsSent(orderId: number): void {
    // const order = this.orders.find(o => o.id === orderId);
    // if (order) {
    //   order.isSent = true;
    //   console.log(`Order ID ${orderId} marked as sent.`);
    //   alert(`Order ID ${orderId} has been marked as sent.`);
    // }

    this.orderService.post('', orderId).subscribe(data => {
      this.orderService.get(this.authService.getUserId().toString()).subscribe(data => {
          this.dataFromService = data;
        });
      });
      alert(`Order ID ${orderId} sikeresen elküldve a futárszolgálatnak!`);
  }

  // Calculate the net total (after commission) for an order
  calculateNetTotal(totalPrice: number): number {
    const commission = 5; // Fixed commission
    return totalPrice - commission;
  }
}
