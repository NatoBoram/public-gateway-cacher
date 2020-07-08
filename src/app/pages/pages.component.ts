import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { Protocol } from '../enums/protocol.enum';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  @ViewChild(MatTable) matTable!: MatTable<Result>;

  gateways!: string[];
  ipfs = '';
  ipns = '';

  readonly dataSource = new MatTableDataSource<Result>([]);
  readonly displayedColumns: ['icon', 'gateway'] = ['icon', 'gateway'];
  readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly gatewayService: GatewayService
  ) { }

  ngOnInit(): void {
    this.gatewayService.list().subscribe((gateways): void => { this.gateways = gateways; });
  }

  cacheIPFS(): void {
    this.ipfs = this.ipfs.trim();
    this.cache(Protocol.IPFS, this.ipfs);
  }

  cacheIPNS(): void {
    this.ipns = this.ipns.trim();
    this.cache(Protocol.IPNS, this.ipns);
  }

  cache(protocol: Protocol, hashpath: string): void {

    // Clear subscriptions
    while (this.subscriptions.length) {
      const sub = this.subscriptions.pop();
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    }

    // Clear table
    this.dataSource.data = [];
    this.matTable.renderRows();
    console.clear();

    this.gateways.forEach((gateway): void => {
      this.subscriptions.push(
        this.gatewayService.get(gateway, protocol, hashpath).subscribe((resp): void => {
          this.dataSource.data.push({
            gateway: this.gatewayService.url(gateway, protocol, hashpath),
            message: resp.statusText,
            icon: this.icon(resp.status)
          });
          this.matTable.renderRows();
        }, (error: HttpErrorResponse): void => {
          this.dataSource.data.push({
            gateway: this.gatewayService.url(gateway, protocol, hashpath),
            message: error.statusText,
            icon: this.icon(error.status)
          });
          this.matTable.renderRows();
        })
      );
    });
  }

  private icon(status: number): string {
    if (status >= 200 && status < 300) return '✅';
    switch (status) {
      case 0: return '❌';
      case 403: return '⛔';
      case 404: return '❓';
      case 500: return '❗';
      default: return environment.production ? '❌' : '🤦‍♂️';
    }
  }

}

interface Result {
  gateway: string;
  message: string;
  icon: string;
}
