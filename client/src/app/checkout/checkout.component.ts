import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { CheckoutService } from './checkout.service';
import { DataShareService } from '../cart/cart/cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // @ViewChild(StripeCardComponent, {static: false}) card: StripeCardComponent;

   amount
   selectedItem
   months = 1
   user
   key
   cartid
   proceedToPay = true

   notificationMessage = ''
   isModalActive = false

   isTermsAndConditionsActive = false
   termsAndConditions = 'Terms and Conditions'
 
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
    private sharedData: DataShareService,
    private router: Router
    ) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      months: [1, [Validators.required]]
    });

    this.sharedData.selectedItem.subscribe((data:any) => {
      console.log('data',data)
      if(typeof data === 'object') {
        console.log('in if')
        localStorage.setItem('checkout', JSON.stringify(data))
        this.selectedItem = data.item
        this.user = data.user
        this.key = data.key
        this.cartid = data.cartID
      } else {
        let data:any = localStorage.getItem('checkout')
        console.log('shared data', JSON.parse(data))
        this.selectedItem = JSON.parse(data).item
      this.user = JSON.parse(data).user
      this.key = JSON.parse(data).key
      this.cartid = JSON.parse(data).cartID
      }
    })

    this.amount = this.selectedItem.price || this.selectedItem.costPerMonth
    console.log('selected item', this.selectedItem)
  }
 
  proceed() {

    this.proceedToPay = true
    

    const name = this.stripeTest.get('name').value;

          let payload = {
            email: this.stripeTest.value.email,
            name: this.stripeTest.value.name,
            address: this.stripeTest.value.address,
            amount: this.amount * this.months,
            user: this.user,
            item: this.selectedItem,
            key: this.key,
            monthsRented: this.months,
            cartid: this.cartid
          }

          this.checkoutService.checkout(payload).subscribe((res:any) => {
            console.log('on checkout', res)
            if(res.success) {
              this.isModalActive = true
              this.notificationMessage = res.message
              setTimeout(() => {
                this.isModalActive = false
              }, 3000)
              
              setTimeout(() => {
                this.router.navigateByUrl('/dashboard/history')
              }, 3500)
            }
           
          })

  }

  termsAndConditionsChange(value) {
    console.log('checkbox', value)
    if(value) {
      this.proceedToPay = false
    } else {
      this.proceedToPay = true
    }
  }

}
