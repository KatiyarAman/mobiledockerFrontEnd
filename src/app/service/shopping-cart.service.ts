import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../model/CategoryModel';
import { IAlert } from '../ModelInterface/IAlert';
import { CategoryData } from '../ModelInterface/modelInterface';
import { CartService } from './CartService/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  public userId:any=localStorage.getItem('userId');
  shopping_cart_items: any[]=[];
  items:any[]=[];

 
/*** to save the client  */
  constructor(private cartService:CartService) { }
  addProduct = (categoryModel: CategoryModel)=>{
    let items = this.get_shopping_cart_items();
    if(items==null){
      items.push(categoryModel);
      this.shopping_cart_items.push(categoryModel)
      localStorage.setItem('shopping_cart', JSON.stringify(items))
       //this.AddToCartTable(categoryModel.categoryId,localStorage.getItem('userId'));
    }else{
     // this.AddToCartTable(categoryModel.categoryId,localStorage.getItem('userId'));
      this.shopping_cart_items.push(categoryModel);
       localStorage.setItem('shopping_cart', JSON.stringify(this.shopping_cart_items))
    }

  }

  get_shopping_cart_items=()=>{
    let items = localStorage.getItem('shopping_cart');
    if(items==null)return (JSON.parse('{}'));
    else return (JSON.parse(items));
  }
  getCartLength =()=>{
    let items = this.get_shopping_cart_items();
    return items? this.get_shopping_cart_items().length: 0;

  }
  getTotal = ()=>{
    let items = this.get_shopping_cart_items();
    return items?.reduce((acc: any, item: { categoryPrice: any; })=> acc+ item.categoryPrice, 0)

  }
  removerItem=(p: { id: any; })=>{
    console.log('calling remover ', p)
    let items = this.get_shopping_cart_items();
    
    const index = items.findIndex((item: { id: any; })=> item.id == p.id);
    if(index>=0){
      console.log('hitting if')
      items.splice(index, 1);
      return localStorage.setItem('shopping_cart', JSON.stringify(items))
    }

  }


  AddToCartTable(categoryId: string, arg1: string | null) {
    this.cartService.createCart(categoryId,arg1)
    .subscribe(response=>{console.log(response)},error=>{console.log(error)});
  }
 
}
