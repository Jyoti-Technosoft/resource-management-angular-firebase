import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  cname: string;
  position: number;
  sname: number;
  invoiceno: string;
  purchaseDate:Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, cname: 'HP', sname: 1.0079, invoiceno: 'H',purchaseDate:new Date()},
  {position: 2, cname: 'Helium',sname: 4.0026, invoiceno: 'He',purchaseDate:new Date()},
  {position: 3, cname: 'Lithium', sname: 6.941, invoiceno: 'Li',purchaseDate:new Date()},
  {position: 4, cname: 'Beryllium', sname: 9.0122, invoiceno: 'Be',purchaseDate:new Date()},
  {position: 5, cname: 'Boron', sname: 10.811, invoiceno: 'B',purchaseDate:new Date()},
  {position: 6, cname: 'Carbon', sname: 12.0107, invoiceno: 'C',purchaseDate:new Date()},
  {position: 7, cname: 'Nitrogen', sname: 14.0067, invoiceno: 'N',purchaseDate:new Date()},
  {position: 8, cname: 'Oxygen', sname: 15.9994, invoiceno: 'O',purchaseDate:new Date()},
  {position: 9, cname: 'Fluorine', sname: 18.9984, invoiceno: 'F',purchaseDate:new Date()},
  {position: 10, cname: 'Neon', sname: 20.1797, invoiceno: 'Ne',purchaseDate:new Date()},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'cname', 'sname', 'invoiceno','purchaseDate','operation'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }
  ngOnInit(): void {
  }
  

}
