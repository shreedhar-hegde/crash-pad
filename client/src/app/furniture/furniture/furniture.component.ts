import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from 'src/app/auth/auth.service';

interface FurnitureResponse {
  name: String,
  price: Number,
  furnitureImage: String
}

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {

  isModalActive: boolean = false;
  furnitures
  userId
  showNotification = false
  constructor(private furnitureService: FurnitureService, 
    private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.furnitureService.getFurnitures().subscribe((res:any) => {
      this.furnitures = res.furnitures
      console.log('furnitures', this.furnitures)
    })

    this.checkIfInCart()

    this.authService.loggedIn$.subscribe(user => {
      this.userId = user._id
      console.log('userid', this.userId)
    })

    
  }

  checkIfInCart() {
    this.cartService.getCart().subscribe((res:any) => {
      console.log('check if in cart', res.cart[0].furniture)
      let furnitureCart = res.cart[0].furniture

      furnitureCart.map((item, index) => {
        if(item._id === this.furnitures[index]._id) {
          this.furnitures[index].isInCart = true
        }
      })
    })
  }

  onLikeClick(furnitureId) {
        this.cartService.cart({furnitureId: furnitureId, userId: this.userId, key: 'furniture'}).subscribe(res => {
          console.log('added to cart', res)
        }) 
      }
      



  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
