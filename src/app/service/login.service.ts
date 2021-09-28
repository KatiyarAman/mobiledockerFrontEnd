import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../model/api.response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<ApiResponse>;
    public currentUser: Observable<ApiResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    public memo!:any
  constructor(private http:HttpClient) {
  this.memo = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<ApiResponse>(JSON.parse(this.memo));
        this.currentUser = this.currentUserSubject.asObservable();
        
   }
  
  private baseUrl: string = "http://localhost:8080";
 
  //calling the server to generate the token 

genrateToken(credentials: any):Observable<any>{
  //token generate
  console.log("login service"+this.baseUrl)

  return this.http.post<ApiResponse>(`${this.baseUrl}/token`,credentials)
}
  
  get currentUserValue() {
    return this.currentUserSubject.value;
}
  //for loginUser
  loginUser(token: string,userId:any){
    localStorage.setItem("token",token);
    localStorage.setItem("userId",userId);
    return true;
  }

  //to checked that user is log in or not
  isLoggedIn(){
   let token= localStorage.getItem("token");
     if(token == undefined || token=='' || token==null){
        return false;
        }
        else{ return true; }
     }

     logout(){
       localStorage.removeItem("token")
       return true;
     }

     //for getting the token
     getToken(){
       return localStorage.getItem("token")
     }

     getCurrentUserId(){
       return localStorage.getItem("userId");
     }
     //////////////
     storeRole(role: any) {
      this.removeRole();
      localStorage.setItem('userId', JSON.stringify(role));
    }
    getRole() {
      // return localStorage.getItem("role");
      let items = localStorage.getItem('userId');
    if(items==null)return (JSON.parse('{}'));
    else return (JSON.parse(items));
    }
    removeRole() {
      return localStorage.removeItem("userId");
    }
}
