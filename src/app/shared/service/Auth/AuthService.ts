import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {  of, Subject } from 'rxjs';

import { environment } from "src/environments/environment";
import * as jwt_decode from 'jwt-decode';
import { User } from "../data/User";
import { DataService } from "src/app/services/DataService";
import { RememberMeService } from "src/app/services/RemberService";
import { map } from "rxjs/operators";

declare let returnUrl: string
declare let oauthToken: string
@Injectable({ providedIn: 'root' })
export class AuthService {
    
    token!: string;
    private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;
    constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router,
        private dataService:DataService,private rememberMeService:RememberMeService)
    {}

    getUserDetails(user: { token: any; }){
        const userDetails = new User();
        //console.log(userDetails)
        var token = user.token;
        var decoded = jwt_decode.default(token);
        console.log(decoded);
        return userDetails
      }
    
      signInUser(credentials: any){
          //console.log(credentials);
          return this.http.post<any>(environment.base_url + '/token',credentials).pipe(
            map(user => {
            // login successful if there's a jwt token in the response
              //console.log(user)
              if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                environment.oauth_token=user.token
                localStorage.setItem(environment.oauth_token,user.token)
                //console.log(JSON.stringify(user.token))
                environment.auth_token = JSON.stringify(user.token)
                //console.log(user)
                environment.current_user.currentUser = this.getUserDetails(user);
              }
      
              return user;
            })
          )
          //your code for checking credentials and getting tokens for for signing in user
      }


      logout() {
        environment.bearer_token_header.Authorization = "Bearer "
        environment.bearer_token_header_file.Authorization = "Bearer "
        oauthToken = ""
        
        // localStorage.removeItem("actions")
        this.dataService.subDomainGlobal = ""
        localStorage.removeItem("subdomain")
        localStorage.removeItem("history_stack")
        localStorage.removeItem("current_page")
        localStorage.removeItem(environment.oauth_token)
        localStorage.removeItem("verticleMenu")
        returnUrl = ""
        this.rememberMeService.clearRememberMeCookie();
        // console.log(document.location.host)
        window.location.href = environment.httpPath+document.location.host
      }
      getToken() {    
        return environment.bearer_token_header.Authorization;
      }
    
      isAuthenticated() {
         // console.log("2 -"+localStorage.getItem(environment.oauth_token));
          //null or undefined
          if(!localStorage.getItem(environment.oauth_token) || localStorage.getItem(environment.oauth_token) == 'undefined'){
            return false
          }
          // const token = oauthToken;
          const token= (localStorage.getItem(environment.oauth_token)|| '{}')
          this.dataService.setDecodedToken(jwt_decode.default(token))
          if (Date.now() >= this.dataService.decodedToken.exp * 1000){
            console.log(window.location.href)
            if(!window.location.href.includes('portal')){
              this.logout();
            }else{}
            return false;
          }
          return true;
      }

}   

