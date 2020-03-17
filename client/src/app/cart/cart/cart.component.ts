import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart

  furnitureItems = []
  propertyItems = []

  constructor(private cartService: CartService) { }

  ngOnInit() {
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


}
