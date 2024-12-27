import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ProducerData } from '@shared/models/producerData';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase<ProducerData> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/ProducerData');
  }

}
