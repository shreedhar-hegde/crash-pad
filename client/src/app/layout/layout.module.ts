import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { PropertiesModule } from '../properties/properties.module';
import { ProfileModule } from '../profile/profile.module';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    SidebarModule,
    CommonModule,
    LayoutRoutingModule,
    PropertiesModule,
    ProfileModule,
    AdminModule,
  ]
})
export class LayoutModule { }
