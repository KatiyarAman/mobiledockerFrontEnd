import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';

@Injectable({
  providedIn: 'root'
})
export class HeaderCategoryService {

  constructor(private http:HttpClient) { }
  private baserUrl:string="http://localhost:8080";
  
  getHeaderCategory(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
   return this.http.get(environment.api_url+'/headerCategory',{ headers: environment.bearer_token_header });
  }
}
