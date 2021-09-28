import { Brand } from "../model/Brand";
import { BrandModel } from "../model/BrandModel";


export interface PartData{
    brandId:string;
    brandName:string;
    modelId:string;
    modelName:string;
  }
  export interface CategoryData{
    categoryId:string;
    categoryName:string;
  }
  export interface HeaderCategoryData{
    categoryId:string;
    categoryName:string;
  }
  export interface BrandData{
    brandId:string;
    brandName:string;
  }
  export interface ModelData{
    modelId:string;
    modelName:string;
    brand:Brand[];
  }
  
  export interface UserData {
    userEmail: string;
      userName:string ;
      userPassword:string  ;
      userId: string;
      userMobile: string;
      userCity: string;
      userZipcode: string; 
      userRole:string; 
      
  }
  export interface DialogData {
    animal: string;
    name: string;
  }
  export interface BookUser{
      userName:string;
      userPhone :string;
      userCity:string;
      userZipCode:string;
      userBookedId:string;
      userStatus:string;
      userBrand:UserBrand[];
      userIssue:UserIssue[];
  }
  export interface UserBrand{
    userBrand: string;
    userModel: string;
    userBookedId: string;
  }
  export interface UserIssue{
    userIssue: string;
    userReason: string;
    userBookedId: string;
}
export interface Product{
  
    categoryId:string;
     brandId:string;
	   modelId :string;
     parent:string;
     brandName:string;
     modelName:string;
     headerCategoryId:string;
     categoryName:string;
     categoryPrice:string;
     categoryDescription:string;
     brand:Brand;
     model:BrandModel;
     
}