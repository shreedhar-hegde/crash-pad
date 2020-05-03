import { Component, OnInit, Injectable } from '@angular/core';
import { CartService } from '../cart.service';
import { FurnitureService } from 'src/app/furniture/furniture.service';
import { PropertiesService } from 'src/app/properties/properties.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataShareService {
 
    selectedItem = new BehaviorSubject<any>('');

}

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
  notificationMessage
  isModalActive = false
  user

  constructor(private cartService: CartService,
    private furnitureService: FurnitureService,
    private propertyService: PropertiesService,
    private router: Router,
    private sharedData: DataShareService
    ) { }
  
    cartInit() {

      this.cartService.getCart().subscribe((cartResponse: any) => {
        console.log('cart lenght', cartResponse['cart'].length)
       if(cartResponse['cart'].length > 0) {
        this.cart = cartResponse['cart']
        this.isVerfied = cartResponse['cart'][0].user['isVerified']

        this.user = cartResponse['cart'][0].user
        console.log('user', this.user)

        this.cartID = this.cart[0]._id
        for(let cart of this.cart) {
          cart.furniture.forEach(item => {
            this.furnitureItems.push(item)
          });
          cart.property.forEach(item => {
            this.propertyItems.push(item)
          })
        }      
      }
    })
        
    }

  ngOnInit() {
    this.cartInit()
    console.log('local storage', localStorage)
  }
  
  onRemoveFurnitureClick(furnitureId) {
    let userId = JSON.parse(localStorage.getItem('token')).user._id
    console.log('remove furniture',furnitureId, userId)
    this.cartService.removeFurniture(furnitureId, userId).subscribe((res:any) => {
      if(res.success) {
        this.isModalActive = true
        this.notificationMessage = res.message
        setTimeout(() => {
          this.isModalActive = false
        }, 1500)
       this.furnitureItems.splice(this.furnitureItems.indexOf(furnitureId), 1)
      }
    })
  }

  onRemovePropertyClick(propertyId) {
    console.log('onRemovePropertyClick', propertyId)
    let userId = JSON.parse(localStorage.getItem('token')).user._id

    this.cartService.removeProperty(propertyId, userId).subscribe((res:any) => {
      if(res.success) {
        this.isModalActive = true
        this.notificationMessage = res.message
        setTimeout(() => {
          this.isModalActive = false
        }, 1500)
        this.propertyItems.splice( this.propertyItems.indexOf(propertyId) , 1)
      }
    })
  }

  onCheckout(data) {
    console.log('checkout', data);
    this.sharedData.selectedItem.next({item: data.item, key: data.key, user: this.user, cartID: this.cartID})
    this.router.navigateByUrl('/dashboard/billing')
  }

}
