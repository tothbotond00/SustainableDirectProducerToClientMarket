import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ProducerData } from '@shared/models/producerData';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase<ProducerData> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/ProducerData');
  }

  getProducerData(userId: number): Observable<ProducerData> {
    return this.getOne(userId.toString()).pipe(
      map(producerData => {
        producerData.image_Profile_Url = this.createImageFromBase64(producerData.image_Profile);
        producerData.image_One_Url = this.createImageFromBase64(producerData.image_One);
        producerData.image_Two_Url = this.createImageFromBase64(producerData.image_Two);
        producerData.image_Three_Url = this.createImageFromBase64(producerData.image_Three);
        return producerData
      })
    );
  }

  // Converts the base64 image to a URL.
  private createImageFromBase64(base64Image: string): string {
    if (!base64Image) return '';
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }

}
