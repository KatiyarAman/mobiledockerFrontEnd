import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartData } from '../adminComponents/add-part/add-part.component';
import { ApiResponse } from '../model/api.response';
import { PartModel } from '../model/PartModel';

@Injectable({
  providedIn: 'root'
})
export class AddPartService {

  constructor(private http:HttpClient) { }

  getWareHouseParts(){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
  return this.http.get(environment.api_url +'/warehouse',{ headers: environment.bearer_token_header });
  }
  createWareHouseParts(partmodel:PartModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(environment.api_url +'/warehouse',partmodel,{ headers: environment.bearer_token_header });
  }
  getWarehousePartsByBrandIdandModelId(brandId:string,modelId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(environment.api_url +'/warehouse/brandId/modelId',{ headers: environment.bearer_token_header });
  }
  updateWaherhouse(warehouseId:string,partmodel:PartModel){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put(environment.api_url +'/warehouse'+partmodel.warehouseId,partmodel,{ headers: environment.bearer_token_header });
  }
  deleteWaherhouse(warehouseId:string){
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.delete(environment.api_url +'/warehouse'+warehouseId,{ headers: environment.bearer_token_header });
  }
}


