import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ServicesService } from "../services.service";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  courses: any;
  constructor(private fb: FormBuilder,public firebase: AngularFireDatabase,public servicesService:ServicesService ) { 
    firebase.list('/courses')
    .valueChanges().subscribe(courses =>{
      this.courses = courses;
      console.log(this.courses);
    });
  }
  ngOnInit(): void {  
  }
  // computerList : AngularFireList <any>;
  userForm: FormGroup = new FormGroup({
    invoiceno : new FormControl('', [Validators.required]),
    companyName : new FormControl('', [Validators.required]),
    sellerName : new FormControl('', [Validators.required]),
    ram : new FormControl('', [Validators.required]),
  });
  computerList: any = [];
  insertData(){
    this.computerList.push({
      computerName: "Aoc",
      Invoiceno: "123456",
      sellerName: "Rahul",
      Ramwarranty: "10-10-2021",
    })
  }

  getErrorMessage(colName: any) {
    // console.log("colName",colName);
    return colName+" is mandatory";
  }

  checkInvoiceNo(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    console.log("colName",colName);

    if (!((charCode > 64 && charCode < 91 ) || (charCode > 96 && charCode < 123) || charCode == 8  || (charCode >= 48 && charCode <= 57) && colName === 'invoiceno')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  checkcompanyName(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    console.log("colName",colName);

    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8  || charCode == 32  || charCode == 95  || (charCode >= 48 && charCode <= 57) && colName === 'companyName')){
      console.log("colName yes its computerName",colName);  
      event.preventDefault();
      return false;
    }
    return true;
  }

  checksellerName(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    console.log("colName",colName);

    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) && colName === 'sellerName')){
      console.log("colName yes its sellerName",colName);  
      event.preventDefault();
      return false;
    }
    return true;
  }
  getData(){
    // this.computerList = this.firebase.list()
  }
  onFormSubmit(): void {
    this.insertData(); 
    // this.servicesService.form.value.coffeeOrder = this.coffeeOrder;
    //   let data = this.servicesService.form.value;
      
    //  this.servicesService.createCoffeeOrder(data)
    //      .then(res => {
    //          /*do something here....
    //          maybe clear the form or give a success message*/
    //          this.resetForm();
    //      }); 
  } 
  resetForm() { 
    this.userForm.reset();
} 
}
