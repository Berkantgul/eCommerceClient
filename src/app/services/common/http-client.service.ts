import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`
  }


  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = ""
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`

    return this.httpClient.get<T>(url, { headers: requestParameters.header })
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = ""
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}`

    return this.httpClient.post<T>(url, body, { headers: requestParameters.header })
  }

  update<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = ""
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}`
    return this.httpClient.put<T>(url, body, { headers: requestParameters.header })
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = ""
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)}/${id}`
    return this.httpClient.delete<T>(url, { headers: requestParameter.header })
  }

}

export class RequestParameters {
  controller?: string;
  action?: string;
  header?: HttpHeaders
  baseUrl?: string;
  fullEndPoint?: string;
}
