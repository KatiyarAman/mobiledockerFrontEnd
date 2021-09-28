import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api.response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  createCart(categoryId:any,userId:any):Observable<any>{
    console.log("cartService" +categoryId +"**"+userId)
    return this.http.get<ApiResponse>(`${this.baseUrl}/cart/`+categoryId+'/'+userId);
  }
  getItemByUserId(userId:any):Observable<any>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/cart/`+userId);
  }
}
