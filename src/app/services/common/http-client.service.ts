import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    let url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`;
    if (requestParameters.fullEndpoint != null) url = requestParameters.fullEndpoint;
    return this.httpClient.get<T>(url, {headers : requestParameters.headers});
  }

  post() {

  }

  put() {

  }

  delete() {

  }

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }
}
export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
