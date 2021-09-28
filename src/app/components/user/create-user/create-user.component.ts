import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/operators';

////////
class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex= /\d/;

    if(regex.test(control.value) && control.value !== null) {
      return Number;
    } else {
      return {passwordInvalid: true};
    }
  }

  static passwordsMatch (control: AbstractControl): ValidationErrors {
    const userPassword = control.get('userPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if((userPassword === confirmPassword) && (userPassword !== null && confirmPassword !== null)) {
      return Number;
    } else {
      return {passwordsNotMatching: true};
    }
  }
}

/////////
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Input() deviceXs!: boolean;
  
  user!: User;
 
  ////
  ////
  registerForm!: FormGroup;
  ////
  
  
  constructor(private route:Router,private fb:FormBuilder,private userService: UserService,) {}

  ngOnInit(): void {
    /////
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      userMobile: ['', [Validators.required]],
      userlastName:[''],
      userEmail: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      userCity: ['', [Validators.required]],
      userZipcode: ['', [Validators.required]],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.passwordContainsNumber
      ]],
      confirmPassword: ['', [Validators.required]]
    },{
       validators: CustomValidators.passwordsMatch
    })
    
    /////

  }

  onSubmit(){
    if(this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.userService.createUser(this.registerForm.value).pipe(
      map(user => this.route.navigate(['login']))
    ).subscribe()
  }













  
}
