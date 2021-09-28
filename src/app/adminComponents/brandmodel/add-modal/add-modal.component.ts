import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand } from 'src/app/model/Brand';
import { BrandModel } from 'src/app/model/BrandModel';
import { Category } from 'src/app/model/Category';
import { BrandData, CategoryData } from 'src/app/ModelInterface/modelInterface';
import { BrandModelService } from 'src/app/service/brand-model.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})


export class AddModalComponent implements OnInit {
  [x: string]: any;
  @Input() deviceXs!: boolean;
  
  //side bar category drop list
  typesOfCategory: Category[] = [];
  //for selecting default category
  catSelected!: Number;
  //define a value to hold data that are coming from html page on click event
  modifiedText!: string;

  brands:BrandData[]=[];
  
  categories:CategoryData[]=[];
  //cretaing new object to send the data
  brand:Brand=new Brand();
   // creating new object to send the data
   brandModel:BrandModel=new BrandModel();
   
  // fromGroup Name
  brandDetails!: FormGroup;

  message=" ";
  submitted = false;
  

  constructor(private brandService:BrandServiceService,private modelService:BrandModelService,
              private router:Router,private spinner: NgxSpinnerService,
              private formbuilder:FormBuilder,private categoryService:CategoryServiceService) {
               
             //for the validation
            this.brandDetails=this.formbuilder.group({
                brandName:new FormGroup({brandName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
                modelName:new FormGroup({ modelName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
                categoryName:new FormGroup({categoryName:new FormControl('',[Validators.required])})                                   
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
        this.spinner.show();
        setTimeout(() => {
         this.spinner.hide();
         }, 1000);
    this.getCategory();
  }


  //userList on click event
  onCategorySelected(val:any){
    //you can call web api
     this.customFunction(val);
      }
     customFunction(val:any){
        console.log(val);
        if(val==1){this.router.navigateByUrl("/userList");} 
        else if(val==2){this.router.navigateByUrl("/addBrand");}
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if(val==8){this.router.navigateByUrl("/category");}

      } 
      onCategoryChange(categoryId:string){
        if(categoryId !=null){
          this.brandService.getBrandsByCategoryId(categoryId)
                          .subscribe((response:any)=>{console.log(response);
                            this.brands=response
                          },
                           error=>{this.messsage=error});
                           
        }
      }
       
       
       submit(){
        this.submitted = true;
        if(this.brandDetails.invalid){return;}
         this.modelService.createModel(this.brandModel)
                          .subscribe(brand=>{console.log(brand);
                            this.submitted = false;
                            this.spinner.show();
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
getBrand(){
  this.brands=[];
  this.brandService.getBrands().subscribe((response:any)=>{
    console.log("RESPONSE :"+response);
    this.brands=response;
    console.log("After collecting response"+this.brands);
  });
 }
 getCategory(){
   this.categories=[];
   this.categoryService.getCategory().subscribe((response:any)=>{console.log(response);
    this.categories=response;
  },error=>{console.log(error)});
  }
     
}
