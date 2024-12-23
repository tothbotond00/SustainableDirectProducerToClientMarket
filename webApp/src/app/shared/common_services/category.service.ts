import {Inject, Injectable} from '@angular/core';
import {ServiceBase} from '@shared/common_services/service-base';
import {Category} from '../../models/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ServiceBase<Category> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Category');
  }

}
