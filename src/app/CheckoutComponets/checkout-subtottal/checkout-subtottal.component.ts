import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api.response';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { OrderModel } from 'src/app/model/OrderModel';
import { PaymentServiceService } from 'src/app/service/payment-service.service';
import { PaymentService } from 'src/app/service/payment.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-checkout-subtottal',
  templateUrl: './checkout-subtottal.component.html',
  styleUrls: ['./checkout-subtottal.component.css']
})
export class CheckoutSubtottalComponent implements OnInit {
  products:CategoryModel[]=[];
  options: any;
  constructor(public shoppingCart: ShoppingCartService,private http:HttpClient,
    public paymentService:PaymentService) { }
orderModel:OrderModel=new OrderModel();
payment!:string;
category!:string
info!:string;
  ngOnInit(): void {
    this.getItems()
  }
  getItems(){
    this.products =  this.shoppingCart.get_shopping_cart_items();
  }
 paymentStarted(paymentValue:any){
   console.log("payment value"+paymentValue);
   if(paymentValue==''|| paymentValue==null){
     alert("amount is Required");
   }
   //sending request to serve to create order
     else{
       this.payment=paymentValue;
     
       this.info="order_request";
       this.orderModel.info=this.info
       this.orderModel.order_ammount=this.payment;
       this.paymentService.createOrder(this.orderModel)
       .subscribe((data:any)=>{console.log(data)})}
                               
                            //if(data.status=="created"){
                              //
                               // this.options={
                                  //  key:'',
                                  //  amount:data.amount,
                                  //  currency:'INR',
                                  //  name:'MobiDocker',
                                  //  image:'',
                                  //  order_id:data.id,
                                   
                                   /**"handler":function(response:any){
                                                      console.log(response.razorpay_payment_id);
                                                      console.log(response.razorpay_order_id);
                                                      console.log(response.razorpay_signature); 
                                                      this.updatePayment(response.razorpay_payment_id,response.razorpay_order_id);
                                                     
                                                      console.log("payment successfull");
                                  
                               }**/
                               /**"handler":function(response:any){
                                                      console.log(response.razorpay_payment_id);
                                                      console.log(response.razorpay_order_id);
                                                      console.log(response.razorpay_signature);
                                                      updatePayment(response.razorpay_payment_id,response.razorpay_order_id);
                                                     this.
                                                      console.log("payment successfull");
                                   
                                   }**/
                              //      handler: ((response: any) => {

                              //        this.paymentService.updateStatuss(response.razorpay_order_id,response.razorpay_payment_id)
                              //        .subscribe(succ=>{console.log(succ)},error=>{console.log(error)});
                              //      })
                              //  ,prefill:{
                              //    name:"",
                              //    email:"",
                              //    contact:"",
                              //  },notes:{
                              //    address:"mobidocker wala",
                              //  },theme:{
                              //    color:"#3399cc",
                              //  }          
                                           
                              
                              // };

                              //to iniatie the payement
                            //   let rzp=new this.paymentService.nativeWindow.Razorpay(this.options);

                            //   rzp.on("payment.failed",function(response: any){
                            //   console.log(response.error.code);
                            //   console.log(response.console.error.description);
                            //   console.log(response.error.source);
                            //   console.log(response.error.step);
                            //   console.log(response.error.reason);
                            //   console.log(response.error.metadata.order_id);
                            //   console.log(response.error.metadata.payment_id);
                            //   alert("oops payment failed ..!")
                            //   });
                            //   rzp.open();
                            //  }
                            
                            //},error=>{console.log(JSON.stringify(error))});
                  
        }
   }

   ///updatePayment(razorpay_payment_id: any, razorpay_order_id: any) {
      // console.log("paymentId"+razorpay_payment_id+"RazororderId"+razorpay_order_id);
        // PaymentService.updateStatus(razorpay_payment_id,razorpay_order_id);
       
   //}
//}
 
//function updatePayment(razorpay_payment_id: any, razorpay_order_id: any) {
 // CheckoutSubtottalComponent.updatePayment(razorpay_payment_id,razorpay_order_id);

//}



