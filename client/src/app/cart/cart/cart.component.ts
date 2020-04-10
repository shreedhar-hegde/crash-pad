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
  cartID
  furnitureItems = []
  propertyItems = []
  isVerfied

  constructor(private cartService: CartService,
    private furnitureService: FurnitureService,
    private propertyService: PropertiesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe((cartResponse: any) => {
      this.cart = cartResponse['cart']
      this.isVerfied = cartResponse['cart'][0].user['isVerified']
      this.cartID = this.cart[0]._id
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
    this.cartService.removeFurniture(furnitureId, this.cartID).subscribe(res => {
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

  onRemovePropertyClick(propertyId) {
    console.log('remove cart', propertyId)

   this.propertyItems =  this.propertyItems.filter(item => {
     return item.id != propertyId
    })

    this.cartService.removeProperty(propertyId, this.cartID).subscribe()
  }

  onCheckout() {
    console.log('checkout');
    
    this.router.navigateByUrl('/dashboard/checkout')
  }

}
