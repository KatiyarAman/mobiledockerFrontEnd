import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { BookedData } from '../model/BookedData';
import { BookedDataForEdit } from '../model/BookedDataForModel';
import { UserBrand } from '../model/UserBrand';
import { UserIssue } from '../model/UserIssue';

@Injectable({
  providedIn: 'root'
})
export class BookedServiceService {

  constructor(private http:HttpClient) { }
  //base url to communicate with the brand((country) api 
  
  createBooking(bookedData:BookedData){
    console.log("Creating new bookedData : "+bookedData);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/booked',bookedData,{ headers: environment.bearer_token_header })
  }
  createUserBrand(userBookedId:string,userBrand:UserBrand){
    console.log("creatring new userbrand :"+userBrand);
    console.log("userBookedId userBrand :****"+userBookedId)
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/booked/userBrand/'+userBookedId,userBrand,{ headers: environment.bearer_token_header });
  }
  createUserIssue(userBookedId:string,userIssue:UserIssue){
    console.log("Creating new userIssue :" +userIssue);
    console.log("userBookedId userIssue "+userBookedId)
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/booked/userIssue/'+userBookedId,userIssue,{ headers: environment.bearer_token_header });
  }
  getBookUserDetails(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/booked',{ headers: environment.bearer_token_header });
  }
  getBookUsereDetailsByBookedUserId(userBookedId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/booked/'+userBookedId,{ headers: environment.bearer_token_header });
  }
  updateBookUserStatusByBookedUserId(userBookedId:string,bookedUSerData:BookedDataForEdit ){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put(environment.api_url +'/booked/'+bookedUSerData.userBookedId,bookedUSerData,{ headers: environment.bearer_token_header });
  }
}
