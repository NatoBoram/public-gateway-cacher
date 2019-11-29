import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  gateways: string[];
  hash: string;
  dataSource: MatTableDataSource<Result>;
  displayedColumns = [
    'error',
    'gateway',
  ];

  @ViewChild(MatTable, { static: false }) matTable: MatTable<Result>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private readonly gatewayService: GatewayService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.gatewayService.list().subscribe(gateways => this.gateways = gateways);
  }

  cache(): void {
    const hash = this.hash;
    this.dataSource.data = [];
    this.matTable.renderRows();

    this.gateways.forEach(gateway => {
      this.gatewayService.get(gateway, hash).subscribe(_ => {
        this.dataSource.data.push({ gateway: `${gateway.replace(':hash', hash)}`, error: null });
        this.matTable.renderRows();
      }, (error: HttpErrorResponse) => {
        this.dataSource.data.push({ gateway: `${gateway.replace(':hash', hash)}`, error });
        this.matTable.renderRows();
      });
    });

  }

}

interface Result {
  gateway: string;
  error: HttpErrorResponse;
}
