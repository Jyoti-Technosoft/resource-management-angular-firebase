import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ServicesService } from "../services.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  editForm!: FormGroup;
  courses: any;
  invoiceValue!: string;
  ramValue!: string;
  companyNameValue!: string;
  sellerNameValue!: string;
  ramSizeValue!: number;
  ramWarrantyValue!: string;
  dateValue!: any;
  constructor(private fb: FormBuilder,public firebase: AngularFireDatabase,public servicesService:ServicesService, private actRoute: ActivatedRoute,  private router: Router) { 
    firebase.list('/courses')
    .valueChanges().subscribe(courses =>{
      this.courses = courses;
      console.log(this.courses);
    });
  }
  ngOnInit(): void {  
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.servicesService.getSelectedComputer(id).valueChanges().subscribe(data => {
      this.servicesService.form.setValue(data)
      console.log()
    });
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


  getErrorMessage(colName: any) {
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
    this.firebase.list('courses').push({invoiceno:this.invoiceValue,computerName:this.companyNameValue,date:this.dateValue,sellerName:this.sellerNameValue,ramValue:this.ramValue,ramSize:this.ramSizeValue})    
    this.resetForm();
  } 
  resetForm() { 
    this.servicesService.form.reset();
} 
}
