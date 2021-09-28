import { Brand } from "./Brand";
import { BrandModel } from "./BrandModel";

export class CategoryModel{
     categoryId!: string;
     brandId!: string;
	modelId!: string;
     parent!: string;
     headerCategoryId!: string;
     categoryName!: string;
     categoryPrice!: string;
     categoryDescription!: string;
     brand!: Brand;
     model!: BrandModel;
     image!: string;
     constructor(){} 
}