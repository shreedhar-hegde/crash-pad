import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FurnitureComponent } from '../furniture/furniture/furniture.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesComponent } from '../properties/properties/properties.component';
import { LayoutComponent } from './layout.component';


const routes: Routes = [{
  path: 'list', component: LayoutComponent,
  children: [
    {path: 'furniture', component: FurnitureComponent},
    { path: 'property', component: PropertiesComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
