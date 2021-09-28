import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { BookedComponent } from '../adminComponents/booked/booked.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<BookedComponent> {
 
  canDeactivate():boolean{
    return window.confirm("Are you sure ?");
  }
}
