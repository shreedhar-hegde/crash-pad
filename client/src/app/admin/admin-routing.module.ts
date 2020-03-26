import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFurnitureComponent } from './add-furniture/add-furniture.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
