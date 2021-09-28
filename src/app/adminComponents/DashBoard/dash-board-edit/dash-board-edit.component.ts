import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedData } from 'src/app/model/BookedData';
import { BookedDataForEdit } from 'src/app/model/BookedDataForModel';
import { Category } from 'src/app/model/Category';
import { BookUser } from 'src/app/ModelInterface/modelInterface';
import { BookedServiceService } from 'src/app/service/booked-service.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';

@Component({
  selector: 'app-dash-board-edit',
  templateUrl: './dash-board-edit.component.html',
  styleUrls: ['./dash-board-edit.component.css']
})
export class DashBoardEditComponent implements OnInit {
   @Input() deviceXs!:boolean;
   typesOfCategory:Category[]=[];
   catSelected!:Number;
   
   bookedData:BookedDataForEdit=new BookedDataForEdit();
   
   bookedUserDetails!:FormGroup;
   constructor(private snack:MatSnackBar,private router:Router,private formbuilder:FormBuilder,
    private bookUserService:BookedServiceService,private route: ActivatedRoute) {
      this.bookedUserDetails=this.formbuilder.group({
        userName:new FormGroup({userName:new FormControl('',[Validators.required,Validators.minLength(3)])}),
        userBrand:new FormGroup({userBrand:new FormControl('',[Validators.required])},),
        userModel:new FormGroup({userModel:new FormControl('',[Validators.required])},),
        userBookedId:new FormGroup({userBookedId:new FormControl('',[Validators.required])},),
        userStatus:new FormGroup({userStatus:new FormControl('',[Validators.required])},),
        userPhone:new FormGroup({userPhone:new FormControl('',[Validators.required])})
     })
    }


   
  
    ngOnInit(): void {
       this.typesOfCategory=[{Id:1,Name:"userList"},{Id:2,Name:"addBrand"},{Id:3,Name:"addModal"},
       {Id:4,Name:"adminDash"},{Id:5,Name:"addParts"},{Id:6,Name:"brandList"},
       {Id:7,Name:"modelList"},{Id:8,Name:"addMenu"}];
       this.bookedData.userBookedId=this.route.snapshot.params['userBookedId'];
      this.getBookedUSer(this.bookedData.userBookedId);
      
    }
  getBookedUSer(userBookedId: string) {
       this.bookUserService.getBookUsereDetailsByBookedUserId(this.bookedData.userBookedId)
                           .subscribe((response:any)=>{
                            console.log(response);
                                  this.bookedData=(response);
                                          
                                  },error=>{console.log(error)});
        }
        submit(){
          if(this.bookedUserDetails.invalid){return;}
             this.bookUserService.updateBookUserStatusByBookedUserId(this.bookedData.userBookedId,this.bookedData)
                  .subscribe(response=>{console.log(response)},error=>{console.log(error)});
        }
    onCategorySelected(val:any){ this.customFunction(val);}
      customFunction(val:any){
        console.log(val);
        if(val==1)this.router.navigateByUrl("/userList");
        else if(val==2) this.router.onSameUrlNavigation;
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if (val==8){this.router.navigateByUrl("/category");}
      }
      back(){
        this.router.navigateByUrl("/admin");
      }

}
