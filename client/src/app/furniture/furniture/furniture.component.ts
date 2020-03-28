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

    this.authService.loggedIn$.subscribe(user => {
      this.userId = user._id
      console.log('userid', this.userId)
    })
    
  }

  onLikeClick(furnitureId) {

    this.furnitureService.addFurnitureToCart({furnitureId: furnitureId, isInCart: true}).subscribe(res => {
      console.log('update furniture', res)
      if(res.success) {

        this.showNotification = true
        console.log('show notification', this.showNotification)

        setTimeout(() => {
          this.showNotification = false
        }, 5000)

        this.cartService.cart({furnitureId: furnitureId, userId: this.userId}).subscribe(res => {
          console.log('added to cart', res)
        })
      }
    })
    console.log('furniture', furnitureId)
  }



  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
