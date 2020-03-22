import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddFurnitureComponent } from './add-furniture/add-furniture.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddPropertyComponent } from './add-property/add-property.component';


@NgModule({
  declarations: [ AddFurnitureComponent, AdminDashboardComponent, AddPropertyComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
