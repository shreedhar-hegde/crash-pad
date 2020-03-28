import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties
  showNotification = false
  userId
  constructor(private propertyService: PropertiesService, private cartService: CartService, private authService: AuthService
    ) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe((res:any) => {
      console.log('properties', res.properties)
      this.properties = res.properties
    })
    this.checkIfInCart()

    this.authService.loggedIn$.subscribe(user => {
      this.userId = user._id
    })
  }

  checkIfInCart() {
    this.cartService.getCart().subscribe((res:any) => {
      console.log('check if in cart', res.cart[0])
      let propertyCart = res.cart[0].property

     this.properties.map((property, index) => {
        if(property._id === propertyCart[index]._id) {
          return property.isInCart = true
        }
      })

      // propertyCart.map((item, index) => {
      //   if(item._id === this.properties[index]._id) {
      //     this.properties[index].isInCart = true
      //   }
      // })
    })
  }

  onLikeClick(propertyId) {
        setTimeout(() => {
          this.showNotification = false
        }, 5000)

        this.cartService.cart({propertyId: propertyId, userId: this.userId, key: 'property'}).subscribe(res => {
          console.log('added to cart', res)
        })
  }

}
