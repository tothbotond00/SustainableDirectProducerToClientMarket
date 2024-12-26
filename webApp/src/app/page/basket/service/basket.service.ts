import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { Basket } from '@shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService extends ServiceBase<any> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Basket');
  }

}
