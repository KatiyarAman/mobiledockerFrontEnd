import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {
@Input() ordered_products!:any
@Output() deleteEvent: EventEmitter<any> = new EventEmitter()

constructor(public shopping_cart_service: ShoppingCartService) { }

ngOnInit(): void {
  console.log('products ', this.ordered_products)
}

removeItem(p:any){
  console.log("remove item"+p);
  this.shopping_cart_service.removerItem(p)
  this.deleteEvent.emit(p)
}

}
