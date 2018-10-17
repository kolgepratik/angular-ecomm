import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar';
import { RouterNotFoundComponent } from './router-not-found';
import { HomeComponent } from './home';
import { ShoppingCartComponent } from './shopping-cart';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from "@angular/material";

import { LoginComponent } from './login';
import { LogoutComponent } from './logout';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthGuardService, UserService, AdminAuthGuardService } from './services';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ProductComponent } from './product';

import { DataTablesModule } from "angular-datatables";
import { ProductService } from './services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';

/*
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'users', component: HomeComponent },
    { path: 'github-followers/:id/:login', component: GithubFollowersComponent },
    { path: 'posts', component: PostsComponent },
    { path: '**', component: RouterNotFoundComponent }
  ]}
];
*/

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user', canActivate: [ AuthGuardService ],  children: [
    { path: 'product', component: ProductComponent },
    { path: 'order', component: ProductComponent }
  ] },
  { path: 'admin', canActivate: [ AuthGuardService, AdminAuthGuardService ],  children: [
    { path: 'product', component: ProductComponent },
    { path: 'order', component: ProductComponent },
    { path: 'product/new', component: ProductCreateEditComponent },
    { path: 'product/manage/:id', component: ProductCreateEditComponent }
  ] },
  { path: 'access-denied', component: RouterNotFoundComponent },
  { path: '**', component: RouterNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RouterNotFoundComponent,
    HomeComponent,
    ShoppingCartComponent,
    LoginComponent,
    LogoutComponent,
    ProductComponent,
    ProductCreateEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot (appRoutes),
    MatIconModule,
    NgbDropdownModule,
    DataTablesModule,
    AngularFireModule.initializeApp ({
      apiKey: "AIzaSyAXNuWwBkw_Lyk8jZmkHn_vdBn2ej1pAQI",
      authDomain: "kp-ng-ecomm.firebaseapp.com",
      databaseURL: "https://kp-ng-ecomm.firebaseio.com",
      projectId: "kp-ng-ecomm",
      storageBucket: "kp-ng-ecomm.appspot.com",
      messagingSenderId: "491752461166"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
   UserService, 
   ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
