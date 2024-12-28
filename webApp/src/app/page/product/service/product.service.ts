import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceBase<Product> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Product');
  }

  // Gets the product, with the imageUrl property filled.
  getProductById(id: number): Observable<Product> {
    return this.getOne(id.toString()).pipe(
      map(product => {
        product.imageUrl = this.createImageFromBase64(product.image);
        return product;
      })
    );
  }

  // Gets the products of the user, with the imageUrl property filled.
  getProductsOfUser(userId: number): Observable<Product[]> {
    return this.get('user/' + userId).pipe(
      map(products => {
        products.forEach(product => {
          product.imageUrl = this.createImageFromBase64(product.image);
        });
        return products;
      })
    );
  }

}
