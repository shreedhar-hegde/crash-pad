import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureComponent } from './furniture/furniture.component';



@NgModule({
  declarations: [FurnitureComponent],
  imports: [
    CommonModule
  ],
  exports: [FurnitureComponent]
})
export class FurnitureModule { }
