import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/shared/service/Auth/AuthService';
import { environment } from 'src/environments/environment';
declare let returnUrl :string
declare let oauthToken: string
declare let verticleMenu: string
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() deviceXs!: boolean;
  returnUrl: any

  loginDetails:FormGroup;
  constructor(private authService :AuthService,private router:Router,public fb: FormBuilder,
    private http: HttpClient) 
    { 
      this.loginDetails=fb.group({
        userName:new FormGroup({  email:new FormControl('',[Validators.required, Validators.email]), }),
        userPassword:new FormGroup({password:new FormControl('', [Validators.required, Validators.minLength(4)])})
     })
  }
  credentials={
    userName:'',
    userPassword:''
  }
  ngOnInit(): void {
  }
 
  message=" ";
  submitted = false;
  hide = true;
  
     
  submit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginDetails.invalid) {
      return;
       }
    
      if((this.credentials.userName!='' && this.credentials.userPassword !='')&&
      (this.credentials.userName !=null && this.credentials.userPassword !=null)){
        console.log("we have to submit the form to server");
       // this.authService.signInUser(this.credentials).subscribe.x(
         // response =>{
             //      console.log(response.token)
                   //this.loginService.loginUser(response.token,response.userId);
                   
               //    window.location.href="/admin"
                  //},
         // error=>{
             //       console.log(console.error())
              ////      this.message="Bad Credentials ! You must enter correct credentials"
                //  }
        ///)
        //generate token

        this.authService.signInUser(this.credentials).subscribe (data =>{
       console.log(data);
       //window.location.href="/admin"
       this.returnUrl=environment.returnUrl;
       this.router.navigate([this.returnUrl]);

        },error=>{console.log(error)});
      }else{
        console.log("Field are empty")
      }
   }
       btnClick(){
         this.router.navigateByUrl("/addUser");
           }
       
           
      
}
