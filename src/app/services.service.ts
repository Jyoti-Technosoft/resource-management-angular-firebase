import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from '@angular/fire/compat/database';
import { FormControl, FormGroup , Validators } from "@angular/forms";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  courses: any; 
  computerList!: AngularFireList<any>;
  computersList!: AngularFireObject<any>;
  constructor(public firebase: AngularFireDatabase) { 

  }
  form = new FormGroup({        
    invoiceno: new FormControl(''),
    companyName: new FormControl(''),
    sellerName: new FormControl(''), 
    date: new FormControl(''),
    ram: new FormControl(''),
    ramWarranty: new FormControl(''),
    ramSize: new FormControl('')
  })

    getData(){
      this.courses = this.firebase.list('courses');
      return this.courses;
    }
    
    getSelectedComputer(id: any) {
      this.computersList = this.firebase.object('courses/' + id);
      console.log("selected computer",this.computersList);
      return this.computersList;
    }  

    deleteComputerRecord(key: string){
      this.courses = this.firebase.object('courses/' + key);
      this.courses.remove()
      .catch((error: any) => {
      this.errorMgmt(error);
      })
    }
  errorMgmt(error: any) {
    throw new Error('Method not implemented.');
  }

  updateComputerRecord(key: string, records:any){
    this.courses = this.firebase.object('courses/' + key);
    this.courses.update(records)
    .catch((error: any) => {
    this.errorMgmt(error);
    })
  }
  

}
