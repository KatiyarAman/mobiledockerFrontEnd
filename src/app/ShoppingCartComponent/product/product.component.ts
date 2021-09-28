import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { IAlert } from 'src/app/ModelInterface/IAlert';
import { CategoryData } from 'src/app/ModelInterface/modelInterface';
import { CartService } from 'src/app/service/CartService/cart.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 @Input()
  products!: any[];
  categoryModel!: CategoryModel;
  public alerts: Array<IAlert> = [];
  constructor(private shooping_Cart:ShoppingCartService,
    private categoryService:HomeServiceService,private cartService:CartService){}

  ngOnInit(): void {
  }
  addToCart(item: string){
    //console.log("add to cart"+item)
    this.getProductByProductId(item);
  }
  

  getProductByProductId(item:any){
    this.categoryService.getProductByCategoryId(item)
                       .subscribe((response:any)=>{//console.log("****"+response); 
                       this.categoryModel=response;
                        this.shooping_Cart.addProduct(this.categoryModel);
                        this.alerts.push({id:1,type:'message',message:'Product Added successfully.'});
                        setTimeout(()=>{   
                          this.closeAlert(this.alerts);
                     }, 3000);
                      }
                       ,error=>{console.log(error)});
                       
                      }
  closeAlert(alerts: any) {
    const index: number = this.alerts.indexOf(alerts);
  this.alerts.splice(index, 1);
  }
}

  






