import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { CategoryModel } from '../model/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  
  constructor(private http:HttpClient) { }
  private baseUrl:string="http://localhost:8080";
  
  getParentCategory(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/refurbished/parent',{ headers: environment.bearer_token_header });
  }
  getCategoryByCategoryId(categoryId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/refurbished/'+categoryId,{ headers: environment.bearer_token_header });
  }
  createCategory(category:CategoryModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/refurbished',category,{ headers: environment.bearer_token_header });
  }
  createSubCategory(categoryId:string,category:CategoryModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/refurbished/'+category.categoryId,category,{ headers: environment.bearer_token_header });
  }
  updateCategory(categoryId:string,category:CategoryModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put(environment.api_url +'/refurbished/'+category.categoryId,category,{ headers: environment.bearer_token_header });
  }
  delateCategory(categoryId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
   return this.http.delete(environment.api_url +'/refurbished/'+categoryId,{ headers: environment.bearer_token_header });
  }
  getSubCategory() {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/refurbished',{ headers: environment.bearer_token_header });
  }
  /**Category service start here */
  getCategory(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/category',{ headers: environment.bearer_token_header });
  }
  
}
