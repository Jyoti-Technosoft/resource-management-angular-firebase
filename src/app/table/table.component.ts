import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
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
      });
  }

  deleteRecord(index: any, id: string) {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.servicesService.deleteComputerRecord(id);
    this.computerData=[]; 
  }

}
