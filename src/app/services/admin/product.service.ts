import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Product } from 'src/app/contracts/product';
import { BaseResponse } from 'src/app/contracts/base-response';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClientService) { }

  async create(product: Product): Promise<BaseResponse> {
    const response = new BaseResponse();

    try {
      const data = await this.httpClient.post<Product>({ controller: 'product' }, product).toPromise();
      response.data = data;
      response.success = true;
    } catch (error) {
      response.error = error as HttpErrorResponse;
      response.success = false;
    }
    return response;
  }
}
