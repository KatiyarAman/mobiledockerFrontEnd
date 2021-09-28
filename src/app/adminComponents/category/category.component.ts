import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/model/Category';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { BrandData, CategoryData, HeaderCategoryData, PartData } from 'src/app/ModelInterface/modelInterface';
import { BrandModelService } from 'src/app/service/brand-model.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { HeaderCategoryService } from 'src/app/service/header-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() deviceXs!:boolean;
  typesOfCategory: Category[] = [];
  brands:BrandData[]=[];
  parts:PartData[]=[];
  headercategoryData:HeaderCategoryData[]=[];
  categoryData:CategoryData[]=[];
  partDetails!: FormGroup;
  categoryModel:CategoryModel=new CategoryModel();
  message=" ";
  submitted = false;
  catSelected!: Number;
  
  constructor(private spinner: NgxSpinnerService,private brandService:BrandServiceService,
    private modelService:BrandModelService,private categoryService:CategoryServiceService,
    private headerCategoryService:HeaderCategoryService,
    private router:Router,private formBuilder:FormBuilder) {

       this.partDetails=this.formBuilder.group({
        brandName:new FormGroup({brandName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        modelName:new FormGroup({ modelName:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        categoryName:new FormGroup({categoryName:new FormControl('',[Validators.minLength(3)])},),
        parent:new FormGroup({parent:new FormControl('',[])},),
        headerCategoryId:new FormGroup({headerCategoryId:new FormControl('',[Validators.required]),}),
        categoryPrice:new FormGroup({categoryPrice:new FormControl('',[Validators.required,Validators.minLength(3)])},),
        categoryDescription:new FormGroup({ categoryDescription:new FormControl('',[Validators.required,Validators.minLength(3)])})      
      })
     }
     
  submit(){ 
  if(this.partDetails.invalid){return;}
  console.log(this.categoryModel.parent)
    this.categoryService.createCategory(this.categoryModel)
        .subscribe((response:any)=>{
          console.log("create parts" +JSON.stringify(response));
          this.submitted = false;
          this.spinner.show();
        },
        error=>{this.message=JSON.stringify(error)}
        );
        this.categoryModel=new CategoryModel();
        setTimeout(() => {
          this.spinner.hide();
          }, 1200);
        
  }
 
  ngOnInit(): void {
     this.typesOfCategory=[{Id:1,Name:"userList"}, {Id:2,Name:"addBrand"},
      {Id:3,Name:"addModal"},{Id:4,Name:"adminDash"},{Id:5,Name:"addParts"},
      {Id:6,Name:"brandList"},{Id:7,Name:"modelList"},{Id:8,Name:"addMenu"}
    ];
    this.spinner.show();
    setTimeout(() => {
     this.spinner.hide();
     }, 2000);
       this.getSubCategory();
       this.getHeaderCategory();
    }
  getSubCategory() {
    this.categoryData=[];
    this.categoryService.getParentCategory()
    .subscribe((response:any)=>{console.log(response);
      this.categoryData=response
    },error=>{console.log(error)});
  }
    
    getHeaderCategory(){
      this.headercategoryData=[];
      this.headerCategoryService.getHeaderCategory()
          .subscribe((response:any)=>{
            this.headercategoryData=response;
          //  console.log("after collecting the headerCategoryResponse"+this.headercategoryData);
          });
    }
    
  
    
    onChangeBrand(brandId:string){
      if(brandId){
        this.modelService.getModelsByBrandId(brandId).subscribe(
          (response:any)=>{
            //console.log(data)
            this.parts=response
          }
        );
      }else{
        this.parts=[];
      } 
    }
    onChangeCategory(categoryId:string){
      console.log(categoryId)
      if(categoryId!=null){
        this.brandService.getBrandsByHeaderCategoryId(categoryId).subscribe(
          (response:any)=>{console.log(response);
           this.brands=response
          }
        );
      }
    }
    getParent(){
      this.categoryData=[];
      this.categoryService.getParentCategory().subscribe(
        (response:any)=>{console.log(response);
          this.categoryData=response;
        },error=>{console.log(error)}
      );
    }
    //userList on click event
 onCategorySelected(val:any){
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
      btnClick(){}

}
