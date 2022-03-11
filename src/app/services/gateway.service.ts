import type { HttpResponse } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import type { Protocol } from '../enums/protocol.enum'

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient
  ) { }

  list(): Observable<string[]> {
    return this.http.get<string[]>(
      environment.base_href && environment.base_href !== '/'
        ? `${environment.base_href}/assets/json/gateways.json`
        : `${document.querySelector('base')?.href}assets/json/gateways.json`
    )
  }

  get(gateway: string, protocol: Protocol, hashpath: string): Observable<HttpResponse<string>> {
    return this.http.get(`${this.url(gateway, protocol, hashpath)}#x-ipfs-companion-no-redirect`, {
      observe: 'response',
      responseType: 'text',
    })
  }

  url(gateway: string, protocol: Protocol, hashpath: string): string {
    const splits: string[] = hashpath.split('/')
    const url: string = gateway.replace(':type', protocol).replace(':hash', splits.shift() ?? '')
    return splits.length ? [url, splits.join('/')].join('/') : url
  }

}
