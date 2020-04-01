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
  propertyRes
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
    let propertyCart
    this.cartService.getCart().subscribe((res:any) => {
      console.log('chek in cart res', res)

       res.cart.map(res => {
         propertyCart =  res.property
      })
      let ids = propertyCart.map(property => {
        return property._id
      })

      this.properties.map(property => {
        console.log('index', ids.indexOf(property._id))
        if(ids.indexOf(property._id) >= 0) {
          property.isInCart = true
        }
      })
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
