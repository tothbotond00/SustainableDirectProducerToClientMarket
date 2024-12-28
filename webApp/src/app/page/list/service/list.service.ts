import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService extends ServiceBase<Product> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Product');
  }

  getProducts(): Observable<Product[]> {
    return this.get().pipe(
      map( products => {
        products.forEach(product => {
          product.imageUrl = this.createImageFromBase64(product.image);
        });
        return products;
      })
    );
  }

}
