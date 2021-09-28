import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
@Injectable()
export class AuthInterCeptor implements HttpInterceptor{
    constructor(private loginService:LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq=req;
        let token=this.loginService.getToken();

        if(token !=null){
            newReq=newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }
        return next.handle(newReq);
    }}
