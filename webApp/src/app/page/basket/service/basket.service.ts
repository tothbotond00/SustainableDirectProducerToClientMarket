import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { Basket } from '@shared/models/basket';
import { map, Observable } from 'rxjs';
import { Product } from '@shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService extends ServiceBase<Basket> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Basket');
  }

  getProducts(userId: number): Observable<Basket> {
    return this.getOne(userId.toString()).pipe(
      map( data => {
        data.productsInBasket.forEach(product => {
          product.product.imageUrl = this.createImageFromBase64(product.product.image);
        });
        return data;
      })
    );
  }

}
