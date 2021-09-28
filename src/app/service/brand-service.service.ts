import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { Brand } from '../model/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor(private http:HttpClient) { }

  //base url to communicate with the brand((country) api 
   //private baseUrl:string="http://localhost:8080";

   getBrands(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
     return this.http.get(environment.api_url +'/brand',{ headers: environment.bearer_token_header })
   }

   getBrandByBrandId(brandId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
     console.log("Brnad Service : "+brandId);
     return this.http.get(environment.api_url +'/brand'+brandId,{ headers: environment.bearer_token_header });
   }
   createBrand(brand:Brand){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
     console.log("Creating new Brand : "+brand);
     return this.http.post(environment.api_url +'/brand',brand,{ headers: environment.bearer_token_header })
   }
   updateBrand(brandId:string,brand:Brand){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    console.log("updating brand by brandId : "+brandId);
    return this.http.put(environment.api_url +'/brand' + brand.brandId, brand,{ headers: environment.bearer_token_header })
  }
  deleteBrand(brandId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    console.log("Delete brand by brandID : "+brandId);
    return this.http.delete(environment.api_url +'/brand'+brandId,{ headers: environment.bearer_token_header })
  }
  getBrandsByCategoryId(categoryId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/brand/category/'+categoryId,{ headers: environment.bearer_token_header });
  }
  getBrandsByHeaderCategoryId(categoryId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/brand/headerCategory/'+categoryId,{ headers: environment.bearer_token_header });
  }
}
