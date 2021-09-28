
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css']
})
export class CheckoutProductComponent implements OnInit {
  @Input() checkout_products!: any[];
 
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter()

  constructor(public shopping_cart_service: ShoppingCartService) { }

  ngOnInit(): void {
    console.log('products ', this.checkout_products)
  }

  removeItem(p:any){
    console.log("remove item"+p);
    this.shopping_cart_service.removerItem(p)
    this.deleteEvent.emit(p)
  }
}
