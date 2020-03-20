import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component'
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FurnitureModule } from './furniture/furniture.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { PropertiesModule } from './properties/properties.module';
import { CartModule } from './cart/cart.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyComponent } from './verify/verify.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    VerifyComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    FurnitureModule,
    HttpClientModule,
    PropertiesModule,
    LayoutModule,
    CartModule,
    NgxStripeModule.forRoot('pk_test_83XH138cFfAbm9wAj3962PYL00cZArUGwx'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
