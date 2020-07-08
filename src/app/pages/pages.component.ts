import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
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
  readonly displayedColumns: ['error', 'gateway'] = ['error', 'gateway'];
  readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly gatewayService: GatewayService
  ) { }

  ngOnInit(): void {
    this.gatewayService.list().subscribe((gateways): void => { this.gateways = gateways; });
  }

  cacheIPFS(): void {
    this.cache(Protocol.IPFS, this.ipfs);
  }

  cacheIPNS(): void {
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
        this.gatewayService.get(gateway, protocol, hashpath).subscribe((): void => {
          this.dataSource.data.push({ gateway: this.gatewayService.url(gateway, protocol, hashpath), error: null });
          this.matTable.renderRows();
        }, (error: HttpErrorResponse): void => {
          this.dataSource.data.push({ gateway: this.gatewayService.url(gateway, protocol, hashpath), error });
          this.matTable.renderRows();
        })
      );
    });
  }

}

interface Result {
  gateway: string;
  error: HttpErrorResponse | null;
}
