import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FurnitureComponent } from '../furniture/furniture/furniture.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesComponent } from '../properties/properties/properties.component';
import { LayoutComponent } from './layout.component';
import { CartComponent } from '../cart/cart/cart.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { AddFurnitureComponent } from '../admin/add-furniture/add-furniture.component';
import { AddPropertyComponent } from '../admin/add-property/add-property.component';
import { ReportComponent } from '../admin/report/report.component';
import { ListComponent } from '../admin/list/list.component';
import { HistoryComponent } from '../history/history.component';


const routes: Routes = [{
  path: 'dashboard', component: LayoutComponent,
  children: [
    {path: 'furniture', component: FurnitureComponent},
    { path: 'property', component: PropertiesComponent},
    { path: 'liked', component: CartComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'billing', component: CheckoutComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'admin', component: AdminDashboardComponent , 
    children: [{
      path: '', redirectTo: 'list', pathMatch: 'full'},
       {path: 'add-furniture', component: AddFurnitureComponent},
       {path: 'add-property', component: AddPropertyComponent},
       {path: 'list', component: ListComponent}
      ]}, 
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
