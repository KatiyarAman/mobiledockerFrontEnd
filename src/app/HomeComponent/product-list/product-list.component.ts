import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/model/ProductModel';
import { IAlert } from 'src/app/ModelInterface/IAlert';
import { CategoryData, Product } from 'src/app/ModelInterface/modelInterface';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { AuthService } from 'src/app/shared/service/Auth/AuthService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public alerts: Array<IAlert> = [];
  products:Product[]=[];
  productModel: ProductModel = new ProductModel;
  productAddedTocart!: Product[];
  constructor(private route: ActivatedRoute,private homeService:HomeServiceService,private AuthService:AuthService,
    private shooping_Cart:ShoppingCartService) { }

  ngOnInit(): void {
    console.log(this.AuthService.getToken())
    let CategoryId=this.route.snapshot.params['categoryId'];
    this.productList(CategoryId);
  }
  productList(CategoryId:any) {
    this.homeService.getProductList(CategoryId)
                   .subscribe(
                    (response:any)=>{
                      this.products=response,
                      console.log(this.products)},error=>{console.log(error)}
                   )
  }
  addToCart(item:Product){
    this.getProductByProductId(item);
  }
  getProductByProductId(product:Product){
    console.log(product.categoryId)
   this.homeService.getProductByCategoryId(product.categoryId)
   .subscribe(
     (response:any)=>{
  this.productModel=response;
  console.log(response)
  this.productAddedTocart=this.shooping_Cart.get_shopping_cart_items();
              if(this.productAddedTocart==null)
              {
                this.productAddedTocart=[];
                console.log("if bucket is empty :"+product.categoryId)
                this.productAddedTocart.push(product);
                this.shooping_Cart.addProduct(this.productModel)  
                this.alerts.push({id: 1,type: 'success', message: 'Product added to cart.' });
                setTimeout(()=>{   
                  this.closeAlert(this.alerts);
             }, 3000);

              }else{
                console.log("Bucket is not Empty:"+product.categoryId)
                let tempProduct:any
               this.productAddedTocart=this.shooping_Cart.get_shopping_cart_items();
               if(product !=null && this.productAddedTocart.length>0){
                tempProduct=this.productAddedTocart.find(p => p.categoryId == product.categoryId);
               }
                
                if(tempProduct==null)
                {
                  this.productAddedTocart=[]
                  this.productAddedTocart.push(product);
                  this.shooping_Cart.addProduct(this.productModel)  
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Product added to cart.'
                  });
                  //setTimeout(function(){ }, 2000);
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }else
                {
                  this.alerts.push({
                    id: 2,
                    type: 'warning',
                    message: 'Product already exist in cart.'
                  });
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }
              }
              
  
                         
                      
                      },
                    error=>{console.log(error)});
  
                      }

                      public closeAlert(alert:any) {
                        const index: number = this.alerts.indexOf(alert);
                        this.alerts.splice(index, 1);
                    } 
}
