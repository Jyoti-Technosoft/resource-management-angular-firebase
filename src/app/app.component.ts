import { Component } from '@angular/core';
import {default as Data}  from '../assets/mydata.json';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-project';
  public appList= Data;

  constructor(public http: HttpClient){
    console.log("data", Data);
    
  }

 

}

