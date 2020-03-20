import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FurnitureComponent } from '../furniture/furniture/furniture.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesComponent } from '../properties/properties/properties.component';
import { LayoutComponent } from './layout.component';
import { CartComponent } from '../cart/cart/cart.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { CheckoutComponent } from '../checkout/checkout.component';


const routes: Routes = [{
  path: 'dashboard', component: LayoutComponent,
  children: [
    {path: 'furniture', component: FurnitureComponent},
    { path: 'property', component: PropertiesComponent},
    { path: 'liked', component: CartComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'checkout', component: CheckoutComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
