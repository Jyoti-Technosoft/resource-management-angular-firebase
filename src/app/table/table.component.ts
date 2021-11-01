import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ServicesService } from "../services.service";
import { Data } from '@angular/router';
export interface PeriodicElement {
  cname: string;
  position: number;
  sname: number;
  invoiceno: string;
  purchaseDate:Date;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  computerData:any =[];
  selectedComputerData:any =[];
  displayedColumns: any []  =[
    'computerName',
    'sellerName',
    'invoiceno',
    'date',
    'ram',
    'ramWarranty',
    'action'
  ]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(public servicesService:ServicesService) { 
   
  }
  ngOnInit(): void {
    this.servicesService.getData()
    .snapshotChanges().subscribe((records:any ) => {
      records.forEach((item: { payload: { toJSON: () => any; }; key: any; }) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.computerData.push(a as Data);
      });
      this.dataSource = new MatTableDataSource(this.computerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteRecord(index: any, id: string) {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.servicesService.deleteComputerRecord(id);
    this.computerData=[]; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
