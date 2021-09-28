import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/model/Category';
import { PartModel } from 'src/app/model/PartModel';
import { BrandData, CategoryData } from 'src/app/ModelInterface/modelInterface';
import { AddPartService } from 'src/app/service/add-part.service';
import { BrandModelService } from 'src/app/service/brand-model.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
export interface PartData{
  brandId:string;
  brandName:string;
  modelId:string;
  modelName:string;
}

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {
@Input() deviceXs!:boolean;
//side bar category drop list
typesOfCategory: Category[] = [];
//for selecting default category

parts:PartData[]=[];

brands:BrandData[]=[];
categories:CategoryData[]=[];
// fromGroup Name
partDetails!: FormGroup;

partModel:PartModel =new PartModel();

message=" ";
submitted = false;
catSelected!: Number;
  constructor(private spinner: NgxSpinnerService,private brandService:BrandServiceService,
    private modelService:BrandModelService,private warehouseService:AddPartService,
    private router:Router,private formBuilder:FormBuilder,private categoryService:CategoryServiceService) { 

       //for the validation
       this.partDetails=this.formBuilder.group({
        brandName:new FormGroup({brandName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        modelName:new FormGroup({ modelName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        touchandlcd:new FormGroup({touchandlcd:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        touchscreenglass:new FormGroup({touchscreenglass:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        battery:new FormGroup({ battery:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        chargeport:new FormGroup({chargeport:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        loudspeaker:new FormGroup({loudspeaker:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        earspeaker:new FormGroup({ earspeaker:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        audiojack:new FormGroup({audiojack:new FormControl('',[Validators.required,Validators.minLength(3)])},),                                   
        microphone:new FormGroup({microphone:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        network:new FormGroup({ network:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        softwarediagnosis:new FormGroup({softwarediagnosis:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        deadphonediagnosis:new FormGroup({ deadphonediagnosis:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        waterdiagnosis:new FormGroup({waterdiagnosis:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        categoryName:new FormGroup({categoryName:new FormControl('',[Validators.required,Validators.minLength(3)])})
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
    /** spinner starts on init */
    this.spinner.show();
    /** spinner ends after 2 seconds */
    setTimeout(() => {
     this.spinner.hide();
     }, 2000);
//getting categories
this.getCategory();
  }
getCategory(){
  this.categories=[];
  this.categoryService.getCategory()
                      .subscribe((response:any)=>{//console.log((response:any));
                        this.categories=(response);
                      },
                       error=>{console.log(error)})
}


onChangeBrand(brandId:string){
  if(brandId){
    this.modelService.getModelsByBrandId(brandId).subscribe(
      (data:any)=>{
        //console.log(data)
        this.parts=data
      }
    );
  }else{
    this.parts=[];
  } 
}
onChangeCategory(categoryId:string){
  if(categoryId!=null)
  {
    this.brandService.getBrandsByCategoryId(categoryId)
                     .subscribe((response:any)=>{//console.log((response:any));
                      this.brands=response;
                    },
                     error=>{this.message=error});
  }else{this.brands=[]}
}

submit(){
  this.submitted=true;
  if(this.partDetails.invalid){return;}
    this.warehouseService.createWareHouseParts(this.partModel)
        .subscribe((response:any)=>{
          //console.log("create parts" +(response));
          this.submitted = false;
          this.spinner.show();
        },
        error=>{
                             
          this.message=JSON.stringify(error);
        }
        );
        this.partModel=new PartModel();
        setTimeout(() => {
          this.spinner.hide();
          }, 1200);
         
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

     onReset() {
      this.submitted = false;
   }
   
}
