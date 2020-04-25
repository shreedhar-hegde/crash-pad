import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { CheckoutService } from './checkout.service';
import { DataShareService } from '../cart/cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent, {static: false}) card: StripeCardComponent;

   amount
   selectedItem
   months = 1
   user
   key
   cartid
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private checkoutService: CheckoutService,
    private sharedData: DataShareService) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      months: [1, [Validators.required]]
    });

    this.sharedData.selectedItem.subscribe(data => {
      console.log('shared data', data)
      this.selectedItem = data.item
      this.user = data.user
      this.key = data.key
      this.cartid = data.cartID
    })

    this.amount = this.selectedItem.price
    console.log('selected item', this.selectedItem)
  }
 
  proceed() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          console.log(result.token.id, this.stripeTest.value.email);

          let payload = {
            token : result.token.id,
            email: this.stripeTest.value.email,
            name: this.stripeTest.value.name,
            address: this.stripeTest.value.address,
            amount: this.amount,
            user: this.user,
            item: this.selectedItem,
            key: this.key,
            monthsRented: this.months,
            cartid: this.cartid
          }

          this.checkoutService.checkout(payload).subscribe()

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
