import { AfterViewInit, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { error } from 'selenium-webdriver';
import { Brand } from 'src/app/model/Brand';
import { Category } from 'src/app/model/Category';
import { CategoryData } from 'src/app/ModelInterface/modelInterface';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  @Input() deviceXs!: boolean;
  
  //side bar category drop list
  typesOfCategory: Category[] = [];
  //for selecting default category
  catSelected!: Number;
  //define a value to hold data that are coming from html page on click event
  modifiedText!: string;
  //cretaing new object to send the data
  brand:Brand=new Brand();

  // fromGroup Name
  brandDetails!: FormGroup;
  categories:CategoryData[]=[];
  message="";
  submitted = false;
  

  constructor(private brandService:BrandServiceService,
              private router:Router,private spinner: NgxSpinnerService,
              private formbuilder:FormBuilder,private categoryService:CategoryServiceService) {

             //for the validation
            this.brandDetails=this.formbuilder.group({
                brandName:'',
                categoryName:''                                   
               })
              }

  ngOnInit(): void {
    //to initialize Category Array
    this.typesOfCategory=[
      {Id:1,Name:"userList"},
      {Id:2,Name:"addBrand"},
      {Id:3,Name:"addModal"},
      {Id:4,Name:"adminDash"},
      {Id:5,Name:"addParts"},
      {Id:6,Name:"brandList"},
      {Id:7,Name:"modelList"},
      {Id:8,Name:"addMenu"}
    ];
    this.catSelected=1;
    this.getCategory();  
  }
  getCategory(){
    this.categories=[];
    this.categoryService.getCategory().subscribe((response:any)=>{
      this.categories=response;
     // console.log(response)
    }
      ,error=>{this.message=error});
  }
   //userList on click event
   onCategorySelected(val:any){
     this.customFunction(val);
      }
     customFunction(val:any){
        //console.log(val);
        if(val==1){this.router.navigateByUrl("/userList");} 
        else if(val==2){this.router.navigateByUrl("/addBrand");}
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if(val==8){this.router.navigateByUrl("/category");}
      } 
     
       
       submit(){
        this.submitted = true;
        if(this.brandDetails.invalid){return;}
       // console.log(this.brand);
         this.brandService.createBrand(this.brand)
                          .subscribe((brand:any)=>{//console.log(brand);
                            this.spinner.show();
                            this.submitted = false;
                          },       
                            error=>{
                              this.message=JSON.stringify(error);
                            });
                            setTimeout(() => {
                              this.spinner.hide();
                              }, 1200);
                            this.brand=new Brand();        
           }

         onReset() {
                 this.submitted = false;
                  }



}
/** Builds and returns a new User. */


