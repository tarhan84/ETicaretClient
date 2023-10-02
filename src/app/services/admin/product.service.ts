import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Product } from 'src/app/contracts/product';
import { BaseResponse } from 'src/app/contracts/base-response';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  async get(productId: string) : Promise<BaseResponse>{
    const response = new BaseResponse();
    try {
      const data = await this.httpClient.get<Product>({ controller: 'product' }, productId).toPromise();
      response.data = data;
      response.success = true;
    } catch (error) {
      response.error = error as HttpErrorResponse;
      response.success = false;
    }
    return response;
  }

  async update(product: Product): Promise<BaseResponse> {
    const response = new BaseResponse();

    try {
      const data = await this.httpClient.put<Product>({ controller: 'product' }, product).toPromise();
      response.data = data;
      response.success = true;
    } catch (error) {
      response.error = error as HttpErrorResponse;
      response.success = false;
    }
    return response;
  }

  async getAll() : Promise<BaseResponse>{
    const response = new BaseResponse();
    try {
      const data = await this.httpClient.get<Product[]>({ controller: 'product' }).toPromise();
      response.data = data;
      response.success = true;
    } catch (error) {
      response.error = error as HttpErrorResponse;
      response.success = false;
    }
    return response;
  }

  async delete(id: string): Promise<BaseResponse>{
    const response = new BaseResponse();
    try {
      const data = await this.httpClient.delete<Product[]>({ controller: 'product' }, id).toPromise();
      response.data = data;
      response.success = true;
    } catch (error) {
      response.error = error as HttpErrorResponse;
      response.success = false;
    }
    return response;
  }
}
