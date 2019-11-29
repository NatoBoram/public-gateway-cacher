import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<string[]> {
    return this.http.get<string[]>('/assets/json/gateways.json');
  }

  get(gateway: string, hash: string): Observable<Blob> {
    return this.http.get<Blob>(`${gateway.replace(':hash', hash)}#x-ipfs-companion-no-redirect`, {
      responseType: 'blob' as 'json'
    });
  }

}
