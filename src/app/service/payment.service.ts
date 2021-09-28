import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { OrderModel } from '../model/OrderModel';
import { PaymentServiceService } from './payment-service.service';
function _window():any{
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  get nativeWindow():any{
    return _window();
  }
  constructor(private http:HttpClient) { }
  
  //private baseUrl: string = "http://localhost:8080";
  createOrder(orderCO:OrderModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url+'/payment/createOrder',orderCO,{ headers: environment.bearer_token_header });
  }
  updateStatuss(razorpay_order_id:any,razorpay_payment_id:any){
    console.log("********* Entity is going to update"+razorpay_order_id +"****"+razorpay_payment_id)
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/payment/updateOrder/'+razorpay_order_id+'/'+razorpay_payment_id,{ headers: environment.bearer_token_header });
  }
}
