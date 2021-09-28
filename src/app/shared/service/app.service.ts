import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor(private http:HttpClient) { }
  addData(data: any) {
    environment.bearer_token_header_file.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    let formData = new FormData();
    let object = {}
    formData.append('object', new Blob([JSON.stringify(data)], { type: "application/json" }));
    return this.http.post(`${environment.api_url}/refurbished`, formData, { headers: environment.bearer_token_header_file })
  }
}
