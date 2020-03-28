import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FurnitureService } from 'src/app/furniture/furniture.service';
import { PropertiesService } from 'src/app/properties/properties.service';
import { Router } from '@angular/router';

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
    private furnitureService: FurnitureService,
    private propertyService: PropertiesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cartResponse => {
      this.cart = cartResponse['cart']
      console.log('cart service', this.cart)
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
  
  onRemoveFurnitureClick(furnitureId) {
    console.log('furnitureid cart', furnitureId)
    this.cartService.removeFurniture(furnitureId).subscribe(res => {
      console.log('remove item from cart', res)
      if(res.success) {

        this.furnitureService.addFurnitureToCart({furnitureId: furnitureId, isInCart: false}).subscribe()

       this.furnitureItems =  this.furnitureItems.filter(furniture =>{
         return furniture._id === furnitureId
        })
        console.log('after filter', this.furnitureItems)
      }
    })
  }

  onRemovePropertyClick(proeprtyId) {
    console.log('furnitureid cart', proeprtyId)
    this.cartService.removeProperty(proeprtyId).subscribe(res => {
      console.log('remove item from cart', res)
      if(res.success) {

        this.propertyService.updateProperty({proeprtyId: proeprtyId, isInCart: false}).subscribe()

       this.propertyItems =  this.propertyItems.filter(property =>{
         return property._id === proeprtyId
        })
        console.log('after filter', this.furnitureItems)
      }
    })
  }

  onCheckout() {
    console.log('checkout');
    
    this.router.navigateByUrl('/dashboard/checkout')
  }

}
