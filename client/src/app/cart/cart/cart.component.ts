import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FurnitureService } from 'src/app/furniture/furniture.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart

  furnitureItems = []
  propertyItems = []

  constructor(private cartService: CartService,
    private furnitureService: FurnitureService
    ) { }

  ngOnInit() {
    console.log('cart ngoinint')
    this.cartService.getCart().subscribe(cartResponse => {
      this.cart = cartResponse['cart']
      
      for(let cart of this.cart) {
        cart.furniture.forEach(item => {
          this.furnitureItems.push(item)
        });
        cart.property.forEach(item => {
          this.propertyItems.push(item)
        })
      }
      

    })

  }
  
  onRemoveClick(furnitureId) {
    console.log('furnitureid cart', furnitureId)
    this.cartService.remove(furnitureId).subscribe(res => {
      console.log('remove item from cart', res)
      if(res.success) {

        this.furnitureService.updateFurniture({furnitureId: furnitureId, isInCart: false}).subscribe()

       this.furnitureItems =  this.furnitureItems.filter(furniture =>{
         return furniture._id === furnitureId
        })
        console.log('after filter', this.furnitureItems)
      }
    })
  }

}
