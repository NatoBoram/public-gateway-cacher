import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Protocol } from '../enums/protocol.enum';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<string[]> {
    if (environment && environment.base_href !== '/') {
      return this.http.get<string[]>(`${environment.base_href}/assets/json/gateways.json`);
    }

    const base = document.querySelector('base');
    if (base) {
      return this.http.get<string[]>(`${base.href}/assets/json/gateways.json`);
    }

    throw new Error('Couldn\'t find environment nor base.')
  }

  get(gateway: string, protocol: Protocol, hashpath: string): Observable<HttpResponse<string>> {
    return this.http.get(`${this.url(gateway, protocol, hashpath)}#x-ipfs-companion-no-redirect`, {
      observe: 'response',
      responseType: 'text',
    });
  }

  url(gateway: string, protocol: Protocol, hashpath: string): string {
    const splits: string[] = hashpath.split('/');
    const url: string = gateway.replace(':type', protocol).replace(':hash', splits.shift() || '');
    return splits.length ? [url, splits.join('/')].join('/') : url;
  }

}
