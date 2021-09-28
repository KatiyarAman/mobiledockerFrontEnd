import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { OrderModel } from '../model/OrderModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  
  constructor(private http:HttpClient) { }
  //private baseUrl: string = "http://localhost:8080"
  createOrder(orderCO:OrderModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/home/createOrder',orderCO,{ headers: environment.bearer_token_header });
  }
  
}
