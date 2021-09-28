import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/AuthService';
import { environment } from 'src/environments/environment';
declare let returnUrl : string
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
        // console.log("subdomain")
      }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const pattern  = '.*/login*'
        const pattern1 = '.*/login'
        if(window.location.href.split("?error=")[1]){
            // console.log(window.location.href.split("?error=")[1])
            let token = window.location.href.split("?error=")[1]
            this.router.navigate(['/pages/subdomain',{error: token}], {queryParams: { returnUrl: returnUrl }})
          }else if(window.location.href.split("token=")[1]){
            // console.log(window.location.href.split("?token=")[1])
            let token = window.location.href.split("token=")[1]
            if(state.url.match(pattern1)){
              console.log(state.url)
              this.router.navigate(['login',{token: token}])
            }
          }
          else if(!state.url.match(pattern)){
              //console.log(state.url)
            environment.returnUrl=state.url;
           // console.log(environment.returnUrl);
            localStorage.setItem(environment.returnUrl,state.url)
            if(this.authService.isAuthenticated()){
              console.log("Authenticated")
              return this.authService.isAuthenticated()
            }
            // this.router
            // console.log("SUBDOMAIN")
            // console.log(this.router.url)
            //his.router.navigate(['login'])
            this.router.navigate(['login'],{skipLocationChange:true})
            return false;
          }else{
            return true;
          }
        return true;
    }
    

}