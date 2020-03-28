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

    this.authService.loggedIn$.subscribe(user => {
      this.userId = user._id
    })
  }

  onLikeClick(propertyId) {

    this.propertyService.addPropertyToCart({propertyId: propertyId, isInCart: true}).subscribe((res:any) => {
      console.log('update furniture', res)
      if(res.success) {

        this.showNotification = true
        console.log('show notification', this.showNotification)

        setTimeout(() => {
          this.showNotification = false
        }, 5000)

        this.cartService.cart({propertyId: propertyId, userId: this.userId}).subscribe(res => {
          console.log('added to cart', res)
        })
      }
    })
    console.log('furniture', propertyId)
  }

}
