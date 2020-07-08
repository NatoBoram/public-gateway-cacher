import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<string[]> {
    return this.http.get<string[]>(
      environment.base_href && environment.base_href !== '/'
        ? `${environment.base_href}/assets/json/gateways.json`
        : `${document.querySelector('base').href}/assets/json/gateways.json`
    );
  }

  get(gateway: string, type: string, hash: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.url(gateway, type, hash)}#x-ipfs-companion-no-redirect`, {
      responseType: 'blob' as 'json'
    });
  }

  url(gateway: string, type: string, hashpath: string): string {
    const splits = hashpath.split('/');
    const url = gateway.replace(':type', type).replace(':hash', splits.shift());
    return splits.length ? [url, splits.join('/')].join('/') : url;
  }

}
