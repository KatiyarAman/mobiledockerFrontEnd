import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand } from 'src/app/model/Brand';
import { Category } from 'src/app/model/Category';
import { BrandServiceService } from 'src/app/service/brand-service.service';

@Component({
  selector: 'app-updatebrand',
  templateUrl: './updatebrand.component.html',
  styleUrls: ['./updatebrand.component.css']
})
export class UpdatebrandComponent implements OnInit {
@Input() !deviceXs!:boolean;

typesOfCategory:Category[]=[];
catSelected!:Number;

//cretaing new object to send the data
brand:Brand=new Brand();

// fromGroup Name
brandDetails!: FormGroup;

message=" ";
submitted = false;
  constructor(private brandService:BrandServiceService,private route: ActivatedRoute,
    private router:Router,private spinner: NgxSpinnerService,
    private formbuilder:FormBuilder) { 
     //for the validation
     this.brandDetails=this.formbuilder.group({
      brandName:new FormGroup({brandName:new FormControl('',[Validators.required,Validators.minLength(3)])})
                                          
     })
  }

  ngOnInit(): void {
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
    this.brand.brandId = this.route.snapshot.params['brandId'];
    this.brandService.getBrandByBrandId(this.brand.brandId)
      .subscribe((response:any)=> {
        //console.log(response)
        this.brand = response;
      }, error => console.log(error));
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
       
       
       submit(){
        this.submitted = true;
        if(this.brandDetails.invalid){return;}
         this.brandService.updateBrand(this.brand.brandId,this.brand)
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
                            this.router.navigate(['/brandList']);
                   }

  btnClick(){
    console.log("btn click");
  }
  
  
onReset() {
   this.submitted = false;
}

}
