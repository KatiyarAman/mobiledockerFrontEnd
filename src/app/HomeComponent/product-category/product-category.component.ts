import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @Input()
  products!: any[];
  categoryModel!: CategoryModel;
  constructor(private shooping_Cart:ShoppingCartService,private categoryService:HomeServiceService
    ,private router:Router){}

  ngOnInit(): void {
  }
  viewByCategory(CategoryId: string){
    console.log("view more "+CategoryId)
    this.router.navigate(['viewMore',CategoryId],{ skipLocationChange: true });
  }
  addToCart(CategoryId: string){
    console.log("add to cart"+CategoryId)
    this.getProductByProductId(CategoryId);
  }
  getProductByProductId(CategoryId:any){
    this.categoryService.getProductByCategoryId(CategoryId)
                       .subscribe((response:any)=>{//console.log(response); 
                        this.categoryModel=response;
                        this.shooping_Cart.addProduct(this.categoryModel);}
                       ,error=>{console.log(error)});
  
                      }
}
