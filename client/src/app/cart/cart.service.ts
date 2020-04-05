import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/cart'


  getCart() {
    console.log('auth from cart', localStorage)
    return this.http.get(this.url, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
      })
    })
  }

  cart(itemDetails) {
    return this.http.patch(this.url, itemDetails, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
      })
    })
  }

  removeFurniture(furnitureId, cartID) {
    console.log('item details', furnitureId)
    return this.http.delete<any>(`${this.url}/deletefurniture/${furnitureId}/${cartID}`,{
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
      })
    })
  }

  removeProperty(propertyId, cartID) {
    console.log('item details', propertyId)
    return this.http.delete<any>(`${this.url}/deleteproperty/${propertyId}/${cartID}`,{
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
      })
    })
  }

  
}
