import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { BrandModel } from '../model/BrandModel';

@Injectable({
  providedIn: 'root'
})
export class BrandModelService {

  constructor(private http:HttpClient) { }
  //base url to communicate with the model or state api
 // private baseUrl:string="http://localhost:8080";
  
  getModels(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/model',{ headers: environment.bearer_token_header });
  }
  getModelsByBrandId(brandId:string){
    console.log("getting models while clickin on change "+brandId);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/model/brand/'+brandId,{ headers: environment.bearer_token_header })
  }
  getModelByModelId(modelId:string){
    console.log("Model Service : "+modelId);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/model/'+modelId,{ headers: environment.bearer_token_header });
  }
  createModel(model:BrandModel){
    console.log("creating new model :"+model);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/model/',model,{ headers: environment.bearer_token_header });
  }
  updateModel(modelId:string,model:BrandModel){
    console.log("udaing model by modelId "+modelId);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put(environment.api_url +'/model/'+model.modelId,model,{ headers: environment.bearer_token_header });
  }
  deleteModel(modelId:string){
    console.log("deleting model by modelId :"+modelId);
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.delete(environment.api_url +'/model/'+modelId,{ headers: environment.bearer_token_header });
  }
}
