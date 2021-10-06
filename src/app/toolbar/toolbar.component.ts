import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
   myColor:string="red";
   centered=false;
   disabled=false;
   unbounded=false;
   
  constructor() { }

  ngOnInit(): void {
  }

}
