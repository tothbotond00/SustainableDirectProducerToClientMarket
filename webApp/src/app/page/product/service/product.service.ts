import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import {Product} from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceBase<Product> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Product');
  }

}
