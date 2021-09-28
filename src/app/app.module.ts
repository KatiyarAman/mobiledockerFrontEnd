import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import { EmailComponent } from './components/email/email.component'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { FormsModule,FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component'
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {MatTooltipModule} from '@angular/material/tooltip';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BookNowComponent } from './components/book-now/book-now.component'
import {MatStepperModule} from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MydailogComponent } from './mydailog/mydailog.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UserService } from './service/user.service';
import { AuthInterCeptor } from './service/auth.interceptor';
import { UserListComponent } from './components/user/user-list/user-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { AddModalComponent } from './adminComponents/brandmodel/add-modal/add-modal.component';
import { AddPartComponent } from './adminComponents/add-part/add-part.component';
import { BookedComponent } from './adminComponents/booked/booked.component';
import { ModelListComponent } from './adminComponents/brandmodel/model-list/model-list.component';
import { AddBrandComponent } from './adminComponents/brand/add-brand/add-brand.component';
import { BrandListComponent } from './adminComponents/brand/brand-list/brand-list.component';
import { UpdatebrandComponent } from './adminComponents/brand/updatebrand/updatebrand.component';
import { UpdateModelComponent } from './adminComponents/brandmodel/update-model/update-model.component';
import { DeactivateGuard } from './service/deactivate.guard';
import { CategoryComponent } from './adminComponents/category/category.component';
import { DashBoardListComponent } from './adminComponents/DashBoard/dash-board-list/dash-board-list.component';
import { DashBoardEditComponent } from './adminComponents/DashBoard/dash-board-edit/dash-board-edit.component';
import { BannerComponent } from './components/banner/banner.component';
import { CheckoutComponent } from './CheckoutComponets/checkout/checkout.component';
import { CheckoutProductComponent } from './CheckoutComponets/checkout-product/checkout-product.component';
import { CheckoutSubtottalComponent } from './CheckoutComponets/checkout-subtottal/checkout-subtottal.component';
import { ProductComponent } from './ShoppingCartComponent/product/product.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProductCategoryComponent } from './HomeComponent/product-category/product-category.component';
import { ProductListComponent } from './HomeComponent/product-list/product-list.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { OrderComponent } from './OrderComponent/order/order.component';
import { OrderProductComponent } from './OrderComponent/order-product/order-product.component';
import { CheckoutAddressComponent } from './CheckoutComponets/checkout-address/checkout-address.component';
import { AuthGuard } from './shared/service/AuthGaurd/Auth-Gaurd';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EmailComponent,
    HeaderComponent,
    SearchResultComponent,
    ServicesComponent,
    AboutUsComponent,
    BookNowComponent,
    BestSellerComponent,
    MobileComponent,
    LaptopComponent,
    CustomerComponent,
    FooterComponent,
    SidebarComponent,
    MydailogComponent,
    LoginComponent,
    CreateUserComponent,
    UserListComponent,
    AddBrandComponent,
    AddModalComponent,
    AddPartComponent,
    BookedComponent,
    BrandListComponent,
    ModelListComponent,
    UpdatebrandComponent,
    UpdateModelComponent,
    CategoryComponent,
    DashBoardListComponent,
    DashBoardEditComponent,
    BannerComponent,
    ProductComponent,
    CheckoutComponent,
    CheckoutProductComponent,
    CheckoutSubtottalComponent,
    ProductCategoryComponent,
    ProductListComponent,
    LogOutComponent,
    OrderComponent,
    OrderProductComponent,
    CheckoutAddressComponent
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    MatSidenavModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgSelectModule,
    
  ],
  providers: [MatSnackBar,AuthGuard,DeactivateGuard,[{provide:HTTP_INTERCEPTORS,useClass:AuthInterCeptor,multi:true}]],
  entryComponents: [MydailogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
