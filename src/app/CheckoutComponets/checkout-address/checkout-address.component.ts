import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerComponent } from 'src/app/components/customer/customer.component';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { AppService } from 'src/app/shared/service/app.service';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
  products!: CategoryModel[];
  employeeDetails!: any[];
  dataForm!: FormGroup;
  constructor(public shopping_Cart:ShoppingCartService,private fb:FormBuilder,
    private checkoutService:CheckoutService,private AppService:AppService) { }

  ngOnInit(): void {
    this.products=this.shopping_Cart.get_shopping_cart_items();
    console.log(this.products);
    
    this.products.forEach(element=>{
      if(element.categoryId != null){
         this.categoryIds.push(this.fb.group({
           categoryId:[element.categoryId]
         }));
      }
      
    })
    console.log(this.categoryIds);
  }
  
  get f() { return this.dataForm.controls }

   customerForm=this.fb.group({
    categoryIds:new FormArray([  ]),
     employee:new FormArray([  ])
   })
   get employee() : FormArray {
    return this.customerForm.get("employee") as FormArray
  }
  get categoryIds():FormArray{
    return this.customerForm.get("categoryIds") as FormArray
  }
  newEmployee(): FormGroup {
    return this.fb.group({
           employeeName: '',
           employeeEmail: '',
           employeePhone:'',
         })
         }
        

         //while adding we need to add as from group || nested form 
   addEmployee() {
    this.employee.push(this.newEmployee());
}

onSubmit(){
  
 const formData= this.checkoutService.getNewObject(this.customerForm.value)
 console.log(formData)
 this.AppService.addData(formData)
 .subscribe(data=>{console.log(data); this.customerForm.reset();
 })
}

}
