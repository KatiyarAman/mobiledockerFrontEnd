import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { BookedServiceService } from 'src/app/service/booked-service.service';
import { BookedData } from 'src/app/model/BookedData';
import { UserBrand } from 'src/app/model/UserBrand';
import { UserIssue } from 'src/app/model/UserIssue';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class BookNowComponent implements OnInit {
  @Input() deviceXs!: boolean;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!:FormGroup;
  
  bookedData!: BookedData;
  userBrand!:UserBrand;
  userIssue!:UserIssue;
 
   constructor(private route:Router,private snack:MatSnackBar,
    private formBuilder:FormBuilder,private bookedService:BookedServiceService) {}
    
    ngOnInit() { 
      this.firstFormGroup=this.formBuilder.group({
        userName: ['', Validators.required],
        userPhone: ['', Validators.required],
        userEmail:['',Validators.required],
        userCity: ['', Validators.required],
        userZipCode: ['', Validators.required]
      });
      
      this.secondFormGroup=this.formBuilder.group({
        userBrand: ['', Validators.required],
        userModel: ['', Validators.required]
  
      });
      
      this.thirdFormGroup= this.formBuilder.group({
        userIssue: ['', Validators.required],
        userReason: ['', Validators.required]
      });
     }

    onsubmit(){
      this.bookedData=this.firstFormGroup.value;
      if(this.firstFormGroup.invalid){
         console.log("first form group is invalid")
      }else{
           console.log(this.firstFormGroup.value);
           this.bookedService.createBooking(this.bookedData).subscribe((response:any)=>{
            // converting (response:any) into model using constructor in BookedData
            let bookUser=new BookedData(response);
          this.bookedData=bookUser;
         console.log(bookUser);
          },error=>{console.log(error)});
      }
    }
     submit(){
      
      if ( this.secondFormGroup.invalid||this.thirdFormGroup.invalid) {
        console.log("Invalid form data")
        }else{
          console.log(this.secondFormGroup.value);
          console.log(this.thirdFormGroup.value);
          this.userBrand=this.secondFormGroup.value;
          this.bookedService.createUserBrand(this.bookedData.userBookedId,this.userBrand).subscribe((response:any)=>{
          //console.log(response);
          //console.log("****"+this.bookedData.userBookedId)
          },error=>{console.log(error)});
 
           this.userIssue=this.thirdFormGroup.value;
           this.bookedService.createUserIssue(this.bookedData.userBookedId,this.userIssue).subscribe((response:any)=>{
           //console.log(response);
           //console.log("*********"+this.bookedData.userBookedId)
           },error=>{console.log(error)});
          }    
      }
  }
  

