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

  furnitures
  userId
  response
  isModalActive = false
  notificationMessage

  constructor(private furnitureService: FurnitureService, 
    private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {


    this.furnitureService.getFurnitures().subscribe((res:any) => {
      this.response = res.furnitures
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
    let furnitureCart = []
    this.cartService.getCart().subscribe((res:any) => {
      console.log('chek in cart res', res)
       res.cart.map(res => {
         furnitureCart =  res.furniture
      })

      let ids = furnitureCart.map(furniture => {
        return furniture._id
      })

      this.furnitures.map(furniture => {
        console.log('index', ids.indexOf(furniture._id))
        if(ids.indexOf(furniture._id) >= 0) {
          furniture.isInCart = true
        }
      })
    })
  }

  onLikeClick(furnitureId) {

   console.log('clicked')

        this.cartService.cart({furnitureId: furnitureId, userId: this.userId, key: 'furniture'}).subscribe((res:any) => {
          console.log('cart res', res)
          if(res.success) {
            this.isModalActive = true
            this.notificationMessage = res.message
            setTimeout(() => {
              this.isModalActive = false
            }, 1500)
            this.furnitureService.getFurnitures().subscribe((res:any) => {
              this.response = res.furnitures
              this.furnitures = res.furnitures
            })
            this.checkIfInCart()
          }
        }) 
      }
    

}
