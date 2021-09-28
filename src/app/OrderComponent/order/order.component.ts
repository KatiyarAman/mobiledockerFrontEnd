import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LoginService } from 'src/app/service/login.service';
import { OrderService } from 'src/app/service/order.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: any;
userId:any;
  constructor(public shopping_cart:ShoppingCartService,private logingService:LoginService,
    public orderService:OrderService) { }

  
  ngOnInit(): void {
    this.getOrderdProducts()
  }
  getOrderdProducts(){
  this.userId=  this.logingService.getCurrentUserId();
  console.log("**********"+this.userId)
    this.products = this.orderService.getOrderByUserId(localStorage.getItem('userId'))
    .subscribe(response=>{console.log(response);this.products=response},
               error=>{console.log(error)});
   }
  deletedEventHandler(p:any){
    console.log("event handled")
    this.getOrderdProducts()
  }
}
