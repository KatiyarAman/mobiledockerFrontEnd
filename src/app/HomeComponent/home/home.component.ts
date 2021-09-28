import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { BrandModelService } from 'src/app/service/brand-model.service';
import { SearchModel } from 'src/app/model/searchModel';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { error } from '@angular/compiler/src/util';
import { BrandData, CategoryData, PartData } from 'src/app/ModelInterface/modelInterface';
import { AuthService } from 'src/app/shared/service/Auth/AuthService';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() deviceXs!: boolean;
  items!: any[];
  brands:BrandData[]=[];
  parts:PartData[]=[];
  categories:CategoryData[]=[];
  partModel:SearchModel =new SearchModel();
  constructor(private snack:MatSnackBar,private route:Router,private homeService:HomeServiceService,private AuthService:AuthService) { }
  
    searchDetails=new FormGroup({
    brandField:new FormGroup({
     brandId:new FormControl(''),
    }),
    
    seriesFiled:new FormGroup({
      modelId:new FormControl('')
    }),
    categoryField:new FormGroup({
      categoryId:new FormControl('')
    })
  })


  ngOnInit(): void {
    this.getCategory();
    //console.log(this.AuthService.getToken())
  }
  
  getCategory(){
   this.categories=[];
   this.homeService.getCategory().subscribe((response:any)=>{
     this.categories=response;
     //console.log(this.categories)
    },error=>{console.log(error)});
  }
  onChangeCategory(categoryId:string){
    if(categoryId){
      this.homeService.getBrandsByCategoryId(categoryId).subscribe(
        (data:any)=>{
          this.brands=data;
           //console.log(this.brands);}
        });
    }else{
      this.brands=[];
    } 
  }
  onChangeBrand(brandId:string){
    if(brandId){
      this.homeService.getModelsByBrandId(brandId).subscribe(
        data=>{
          //this.parts=data; 
          console.log(this.parts)}
      );
    }else{
      this.parts=[];
    } 
  }
submit(){
  if(this.searchDetails !=null){
    console.log(this.searchDetails.value);
    this.homeService.searchGadgets(this.partModel.brandId,this.partModel.modelId,this.partModel.categoryId).subscribe((response:any)=>{
      console.log(response);
    },error=>{console.log(error)})
  }
}
  btnClick(){
//console.log("btn click");
this.snack.open("Hey Welcome to this App","Cancel")
  }
   
}
