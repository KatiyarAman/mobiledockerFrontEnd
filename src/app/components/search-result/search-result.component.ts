import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedDataForEdit } from 'src/app/model/BookedDataForModel';
import { HomeServiceService } from 'src/app/service/home-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() deviceXs!:boolean;
  bookedUserDetails!:FormGroup;
  bookedData:BookedDataForEdit=new BookedDataForEdit();
  message="";
  constructor(private homeServie:HomeServiceService,private route:ActivatedRoute,
    private formbuilder:FormBuilder,private router:Router) {
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
    this.bookedData.userBookedId=this.route.snapshot.params['userKeyword'];
    this.getBookedUSer(this.bookedData.userBookedId);
  }
  getBookedUSer(userBookedId: string) {
    //if(userBookedId ==null || userBookedId ==""|| userBookedId=="undefind"){this.router.navigateByUrl('/home')}
    //else{
      this.homeServie.getStatus(this.bookedData.userBookedId)
      .subscribe(response=>{
        console.log(response)
             //this.bookedData=(response);    
             },error=>{ this.message=JSON.stringify(error)});}
    
  
  back(){this.router.navigateByUrl('/home')}
  submit(){}

}
