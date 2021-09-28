import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand } from 'src/app/model/Brand';
import { BrandModel } from 'src/app/model/BrandModel';
import { Category } from 'src/app/model/Category';
import { BrandData } from 'src/app/ModelInterface/modelInterface';
import { BrandModelService } from 'src/app/service/brand-model.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.css']
})
export class UpdateModelComponent implements OnInit {

  [x: string]: any;
  @Input() deviceXs!: boolean;
  
  //side bar category drop list
  typesOfCategory: Category[] = [];
  //for selecting default category
  catSelected!: Number;
  //define a value to hold data that are coming from html page on click event
  modifiedText!: string;

  
   // creating new object to send the data
   brandModel:BrandModel=new BrandModel();
   
  // fromGroup Name
  brandDetails!: FormGroup;

  message=" ";
  submitted = false;
  

  constructor(private modelService:BrandModelService,private brandService:BrandServiceService,
              private router:Router,private spinner: NgxSpinnerService,private route: ActivatedRoute,
              private formbuilder:FormBuilder) {
               
             //for the validation
            this.brandDetails=this.formbuilder.group({
                modelName:new FormGroup({ modelName:new FormControl('',[Validators.required,Validators.minLength(3)])})
                                                   
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
         }, 2000);

    this.brandModel.modelId = this.route.snapshot.params['modelId'];
    this.modelService.getModelByModelId(this.brandModel.modelId)
      .subscribe((response:any)=> {
        console.log(response)
        this.brandModel = response;
      }, error => console.log(error));
  }
 
       
       submit(){
        this.submitted = true;
        if(this.brandDetails.invalid){return;}
         this.modelService.updateModel(this.brandModel.modelId,this.brandModel)
                          .subscribe(model=>{console.log(model);
                            this.submitted = false;
                            this.spinner.show();
                          },       
                            error=>{
                             
                              this.message=JSON.stringify(error);
                            });
                            setTimeout(() => {
                              this.spinner.hide();
                              }, 1200);
                              
                            this.model=new BrandModel(); 
                            this.router.navigate(['/modelList']);       
           }

      
  
        onReset() {
                 this.submitted = false;
                 }

                 //userList on click event
        onCategorySelected(val:any){
                this.customFunction(val);
                 }
    customFunction(val:any){
     if(val==1){this.router.navigateByUrl("/userList");} 
     else if(val==2){this.router.navigateByUrl("/addBrand");}
     else if(val==3){this.router.navigateByUrl("/addModal");}
     else if(val==4){this.router.navigateByUrl("/admin")}
     else if(val==5){this.router.navigateByUrl("/addPart");}
     else if(val==6){this.router.navigateByUrl("/brandList");}
     else if(val==7){this.router.navigateByUrl("/modelList");}
     else if(val==8){this.router.navigateByUrl("/category");}

      } 
      

}
