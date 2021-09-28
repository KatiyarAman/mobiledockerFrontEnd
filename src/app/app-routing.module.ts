import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModalComponent } from './adminComponents/brandmodel/add-modal/add-modal.component';
import { AddPartComponent } from './adminComponents/add-part/add-part.component';
import { BookedComponent } from './adminComponents/booked/booked.component';
import { ModelListComponent } from './adminComponents/brandmodel/model-list/model-list.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { LoginComponent } from './components/login/login.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ServicesComponent } from './components/services/services.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

import { AddBrandComponent } from './adminComponents/brand/add-brand/add-brand.component';
import { BrandListComponent } from './adminComponents/brand/brand-list/brand-list.component';
import { UpdatebrandComponent } from './adminComponents/brand/updatebrand/updatebrand.component';
import { UpdateModelComponent } from './adminComponents/brandmodel/update-model/update-model.component';
import { DeactivateGuard } from './service/deactivate.guard';
import { CategoryComponent } from './adminComponents/category/category.component';
import { DashBoardListComponent } from './adminComponents/DashBoard/dash-board-list/dash-board-list.component';
import { DashBoardEditComponent } from './adminComponents/DashBoard/dash-board-edit/dash-board-edit.component';
import { CheckoutComponent } from './CheckoutComponets/checkout/checkout.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProductListComponent } from './HomeComponent/product-list/product-list.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { OrderComponent } from './OrderComponent/order/order.component';
import { AuthGuard } from './shared/service/AuthGaurd/Auth-Gaurd';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'services',component:ServicesComponent},
  {path:'aboutUs',component:AboutUsComponent},
  {path:'bookNow',component:BookNowComponent},
  {path:'bestSeller',component:BestSellerComponent},
  {path:'mobile',component:MobileComponent},
  {path:'laptop',component:LaptopComponent},
  {path:'customer',component:CustomerComponent},
  {path:'searchGadget/:userKeyword',component:SearchResultComponent},
  {path:'login',component:LoginComponent},
  {path:'logOut',component:LogOutComponent,canActivate:[AuthGuard]},
  {path:'addUser',component:CreateUserComponent},
  {path:'booked',component:BookedComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'my_order',component:OrderComponent,canActivate:[AuthGuard]},
  {path:'viewMore/:categoryId',component:ProductListComponent},
  {path:'admin',component:DashBoardListComponent},
  {path:'getbookedUserDetails/:userBookedId',component:DashBoardEditComponent,canActivate:[AuthGuard]},
  {path:'userList',component:UserListComponent,canActivate:[AuthGuard]},
  {path:'addBrand',component:AddBrandComponent,canActivate:[AuthGuard]},
  {path:'addModal',component:AddModalComponent,canActivate:[AuthGuard]},
  {path:'addPart',component:AddPartComponent,canActivate:[AuthGuard]},
  {path:'brandList',component:BrandListComponent,canActivate:[AuthGuard]},
  {path:'modelList',component:ModelListComponent,canActivate:[AuthGuard]},
  {path:'updateBrand/:brandId',component:UpdatebrandComponent,canActivate:[AuthGuard]},
  {path:'updateModel/:modelId',component:UpdateModelComponent,canActivate:[AuthGuard]},
  {path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
  { path: '',
  redirectTo: '/application',
  pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
