import { Injectable } from '@angular/core';
// import { getDatabase, ref, set  } from "firebase/database";
// import { AngularFireDatabase} from '@angular/fire/database';
// import { provideFirebaseApp, getApp, initializeApp, FirebaseApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})

// const database = getDatabase();



export class ServicesService {

  constructor(public firebase: AngularFireDatabase,public firestore: AngularFirestore) { }
  form = new FormGroup({        
    invoiceno: new FormControl(''),
    companyName: new FormControl(''),
    sellerName: new FormControl(''), 
    ram: new FormControl(false)
})

  computerList: any;
    getData(){
      // this.computerList = this.firebase.list()
    }

    insertData(){
      this.computerList.push({
        computerName: "Aoc",
        Invoiceno: "123456",
        sellerName: "Rahul",
        Ramwarranty: "10-10-2021",
      })
    }

    // createCoffeeOrder(data) {
    //   return new Promise<any>((resolve, reject) =>{
    //       this.firestore
    //           .collection("coffeeOrders")
    //           .add(data)
    //           .then(res => {}, err => reject(err));
    //   });
  // }
}
