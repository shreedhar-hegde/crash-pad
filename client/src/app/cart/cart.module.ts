import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent, DataShareService } from './cart/cart.component';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule
  ],
  providers: [DataShareService]
})
export class CartModule { }
