import { CategoryModel } from "./CategoryModel";

export class OrderModel{
    order_Id!:string;
    order_ammount!:string;
    orderCatId!:string;
    paymentId!:string;
    info!:string;
    status!:string;
    refubishedwarehouse!:CategoryModel[]
    constructor(){}

}