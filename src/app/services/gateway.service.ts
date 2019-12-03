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
    return this.http.get<Blob>(`${gateway.replace(':type', type).replace(':hash', hash)}#x-ipfs-companion-no-redirect`, {
      responseType: 'blob' as 'json'
    });
  }

}
