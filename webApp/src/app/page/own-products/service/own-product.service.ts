import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ExampleData } from '../../../shared/models/exampledata';

@Injectable({
  providedIn: 'root'
})
export class OwnProductService extends ServiceBase<ExampleData> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Product');
  }

}
