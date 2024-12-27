import {Inject, Injectable} from '@angular/core';
import {ServiceBase} from '@shared/common_services/service-base';
import {HttpClient} from '@angular/common/http';
import {Category} from '@shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ServiceBase<Category> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Category');
  }

}
