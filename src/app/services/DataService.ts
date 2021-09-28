import { Injectable } from "@angular/core";
import { pagehistory } from "../shared/service/data/data.object";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// export let decodedToken: any
// export function setDecodedToken(value:any){
//   decodedToken = value
// }

@Injectable({
    providedIn: 'root'
})
export class DataService  {
    decodedToken: any;
    setDecodedToken(value: any) {
      this.decodedToken = value;
    }
    
  returnUrl: any;
  event: any;
  //ROUTES: RouteInfo[];
  //HROUTES: RouteInfo[];
  //ROUTES: RouteInfo[];
    //HROUTES: RouteInfo[];
    pageHistory!: pagehistory;
  subDomainGlobal: any = ""
}


