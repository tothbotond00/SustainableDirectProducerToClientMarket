import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ExampleData } from '../../../shared/models/exampledata';
import { Order } from '@shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ServiceBase<Order> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Order');
  }

}
