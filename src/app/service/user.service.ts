import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUsers(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/user',{ headers: environment.bearer_token_header });
  }

  getUserByUserId(userId: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'user' + userId,{ headers: environment.bearer_token_header });
  }

  createUser(user: User){
    console.log("user service"+user)
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/user', user,{ headers: environment.bearer_token_header });
  }

  updateEmployee(userId: number, user: User){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put<ApiResponse>(environment.api_url +'user'+ user.userId, user,{ headers: environment.bearer_token_header });
  }

  deleteEmployee(userId: number){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.delete<ApiResponse>(environment.api_url +'/user' + userId,{ headers: environment.bearer_token_header });
  }
}
