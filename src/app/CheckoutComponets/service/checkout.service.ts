import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api.response';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  

 
  
private baseUrl:string="http://localhost:8080";
  constructor(private http:HttpClient) { }

  getNewObject(obj: any, _type?: any) {
    // console.log(JSON.parse(JSON.stringify(obj)))
    return JSON.parse(JSON.stringify(obj))
  }
}
