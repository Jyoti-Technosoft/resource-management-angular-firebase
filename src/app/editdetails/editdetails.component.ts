import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services.service";
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.scss']
})
export class EditdetailsComponent implements OnInit {
  courses: any;
  invoiceValue!: string;
  ramValue!: string;
  companyNameValue!: string;
  sellerNameValue!: string;
  ramSizeValue!: number;
  ramWarrantyValue!: string;
  dateValue!: Date;
  computerList: any = [];
  key:any; 

  userForm: FormGroup = new FormGroup({
    invoiceno : new FormControl('', [Validators.required]),
    companyName : new FormControl('', [Validators.required]),
    sellerName : new FormControl('', [Validators.required]),
    ram : new FormControl('', [Validators.required]),
    // ramSize: new FormControl(''),
    // date : new FormControl(''),
    // ramWarranty: new FormControl(''),
  });

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
        this.key = id;
      });
    }
  }

  getErrorMessage(colName: any) {
    return colName+" is mandatory";
  }

  checkInvoiceNo(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (!((charCode > 64 && charCode < 91 ) || (charCode > 96 && charCode < 123) || charCode == 8  || (charCode >= 48 && charCode <= 57) && colName === 'invoiceno')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  checkcompanyName(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8  || charCode == 32  || charCode == 95  || (charCode >= 48 && charCode <= 57) && colName === 'companyName')){
      event.preventDefault();
      return false;
    }
    return true;
  }

  checksellerName(event: { which: any; keyCode: any; preventDefault: () => void; }, colName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) && colName === 'sellerName')){
      event.preventDefault();
      return false;
    }
    return true;
  }


  resetForm() { 
    this.servicesService.form.reset();
  } 

  get invoiceno() {
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

  
  onFormSubmit(): void {
    let date = this.dateValue.getDate();
    let year = this.dateValue.getFullYear();
    let month = this.dateValue.getMonth();
    console.log("date",date,"year",year,"month",month);
    let newdate = year + "/" + month + "/" + date;
    this.servicesService.updateComputerRecord(this.key,{invoiceno:this.invoiceValue,computerName:this.companyNameValue,purchaseDate:newdate,sellerName:this.sellerNameValue,ram:this.ramValue,ramWarranty:this.ramWarrantyValue,ramSize:this.ramSizeValue});      
    this.servicesService.form.reset();
  } 

  clear() {
    this.invoiceValue = '',  
    this.companyNameValue = '',  
    this.sellerNameValue = '',  
    this.ramValue = '',  
    this.ramWarrantyValue = ''  
  }

}