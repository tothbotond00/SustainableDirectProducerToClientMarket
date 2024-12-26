import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ProductReview } from '@shared/models/productreview';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService extends ServiceBase<ProductReview> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/ProductReview');
  }

}
