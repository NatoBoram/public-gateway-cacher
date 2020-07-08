import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  gateways: string[];
  ipfs: string;
  ipns: string;
  dataSource: MatTableDataSource<Result>;
  displayedColumns = [
    'error',
    'gateway',
  ];
  subscriptions: Subscription[] = [];

  @ViewChild(MatTable) matTable: MatTable<Result>;

  constructor(
    private readonly gatewayService: GatewayService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.gatewayService.list().subscribe((gateways): void => { this.gateways = gateways; });
  }

  cacheIPFS(): void {
    this.cache('ipfs', this.ipfs);
  }

  cacheIPNS(): void {
    this.cache('ipns', this.ipns);
  }

  cache(type: string, hash: string): void {

    while (this.subscriptions.length) {
      const sub = this.subscriptions.pop();
      if (!sub.closed) {
        sub.unsubscribe();
      }
    }

    this.dataSource.data = [];
    this.matTable.renderRows();
    console.clear();

    this.gateways.forEach((gateway): void => {
      this.subscriptions.push(
        this.gatewayService.get(gateway, type, hash).subscribe((): void => {
          this.dataSource.data.push({ gateway: this.gatewayService.url(gateway, type, hash), error: null });
          this.matTable.renderRows();
        }, (error: HttpErrorResponse): void => {
          this.dataSource.data.push({ gateway: this.gatewayService.url(gateway, type, hash), error });
          this.matTable.renderRows();
        })
      );
    });

  }

}

interface Result {
  gateway: string;
  error: HttpErrorResponse;
}
