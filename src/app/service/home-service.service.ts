import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http:HttpClient) { }

  private baseUrl: string = "http://localhost:8080";
  
  searchGadgets(brandId:string,modelId:string,categoryId:string){
    console.log("**********"+brandId+ "  ******"+modelId)
   // environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/'+brandId+`/`+modelId+`/`+categoryId);
  }
  getBrands(){
    //environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home')
  }
  getBrandsByCategoryId(categoryId:string){
   // environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/brand/'+categoryId);
  }
  getModelsByBrandId(brandId:string){
    //console.log("getting models while clickin on change "+brandId );
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/'+brandId);
  }
  getCategory(){
    //environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/category');
  }
  getBrandsByHeaderCategoryId(categoryId:string){
   // environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/brand/headerCategory/'+categoryId);
  }
  /******Track your belonging*******/
  getStatus(userBookedId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/userBookedId/'+userBookedId);
  }
  /**RefurbishedCategory useed to addd product in cart */
  getProductByCategoryId(categoryId:string){
    //environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token){ headers: environment.bearer_token_header }
    return this.http.get(environment.api_url +'/home/refurbished/'+categoryId);
  }

  /**getting product */
  getProductList(categoryId:string){
// environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/home/product/'+categoryId);
  }
}
