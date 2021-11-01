import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from "@angular/router";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  computerList: any = []; 


  constructor(private fb: FormBuilder,public firebase: AngularFireDatabase,public servicesService:ServicesService,private actRoute: ActivatedRoute,  private router: Router ) { 
    firebase.list('/courses')
    .valueChanges().subscribe(courses =>{
      this.courses = courses;
      console.log(this.courses);
    });
  }

  ngOnInit(): void {  
    const id = this.actRoute.snapshot.paramMap.get('id');
    if(id){
      this.servicesService.getSelectedComputer(id).valueChanges().subscribe(data => {
        this.userForm.patchValue(data);
        console.log("data",data);
        this.invoiceValue = data.invoiceno;
        this.ramValue = data.ram;
        this.companyNameValue = data.computerName;
        this.ramWarrantyValue = data.ramWarranty;
        this.sellerNameValue = data.sellerName;
        this.dateValue = new Date(data.purchaseDate);
        this.ramSizeValue = data.ramSize;
      });
    }
  }

  userForm: FormGroup = new FormGroup({
    invoiceno : new FormControl('', [Validators.required]),
    companyName : new FormControl('', [Validators.required]),
    sellerName : new FormControl('', [Validators.required]),
    ram : new FormControl('', [Validators.required]),
    // ramSize: new FormControl(''),
    // date : new FormControl(''),
    // ramWarranty: new FormControl(''),
  });


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


  onFormSubmit(): void {
    let date = this.dateValue.getDate();
    let year = this.dateValue.getFullYear();
    let month = this.dateValue.getMonth();
    console.log("date",date,"year",year,"month",month);
    let newdate = year + "/" + month + "/" + date;
    this.firebase.list('courses').push({invoiceno:this.invoiceValue,computerName:this.companyNameValue,purchaseDate:newdate,sellerName:this.sellerNameValue,ram:this.ramValue,ramWarranty:this.ramWarrantyValue,ramSize:this.ramSizeValue})      
  } 


  resetForm() { 
    this.userForm.reset();
  } 

  get invoiceno() {
    console.log("yes")
    return this.servicesService.form.get('invoiceno');
  }

  get companyName() {
    return this.servicesService.form.get('companyName');
  }

  get sellerName() {
    return this.servicesService.form.get('sellerName');
  }

  get ram() {
    return this.servicesService.form.get('ram');
  }  

}
