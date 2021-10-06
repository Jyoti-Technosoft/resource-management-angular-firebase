import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
@Component({
  selector: 'app-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.scss']
})
export class AddDetailComponent implements OnInit {
 courses: any;
  invoiceValue!: string;
  ramValue!: string;
  companyNameValue!: string;
  sellerNameValue!: string;
  ramSizeValue!: number;
  ramWarrantyValue!: string;
  dateValue!: Date;
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
    date : new FormControl(''),
    companyName : new FormControl('', [Validators.required]),
    sellerName : new FormControl('', [Validators.required]),
    ram : new FormControl('', [Validators.required]),
    ramSize: new FormControl(''),
    ramWarranty: new FormControl(''),
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
    // this.insertData(); 
    this.firebase.list('courses').push({invoiceno:this.invoiceValue,computerName:this.companyNameValue,date:this.dateValue,sellerName:this.sellerNameValue,ram:this.ramValue,ramWarranty:this.ramWarrantyValue,ramSize:this.ramSizeValue})
    // this.firebase.list('courses').push({})
    // this.firebase.list('courses').push({})
    // this.firebase.list('courses').push({})
    // this.firebase.list('courses').push({ramSize:this.ramSize})
    // this.firebase.list('courses').push({ramWarranty:this.ramWarranty})
    // this.servicesService.form.value.computerList = this.computerList;
    //   let data = this.servicesService.form.value;
      
    //  this.servicesService.insertData();
  } 
  resetForm() { 
    this.userForm.reset();
} 
}
