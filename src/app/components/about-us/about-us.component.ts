import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @Input() deviceXs!: boolean;

step:any=1;
multiStep=new FormGroup({
  userDetails:new FormGroup({
fname:new FormControl(''),
lname:new FormControl(''),
phone:new FormControl(''),
cityName:new FormControl(''),
zipCode:new FormControl('')
  }),
  gadgetDetails:new FormGroup({
    brand:new FormControl(''),
    model:new FormControl('')
  }),
  issueDetails:new FormGroup({
    issue:new FormControl(''),
    reason:new FormControl('')
  })
})
  constructor(private route:Router,private snack:MatSnackBar) { }

  ngOnInit(): void {
    
  }
  submit(){
    this.step=this.step+1;
    if(this.step==4){
this.route.navigate(['/home']);
    }
  }
  previous(){
    this.step=this.step-1;
  }
  btnClick(){
    console.log("btn click");
    this.snack.open("Successfully Submitted","Cancel")
      }

}
