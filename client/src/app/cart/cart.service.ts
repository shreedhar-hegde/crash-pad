import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/cart'
  jwt:string = JSON.parse(localStorage.getItem('token')).jwt
  auth = 'bearer ' + this.jwt
  getCart() {
    return this.http.get(this.url, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

  cart(itemDetails) {
    return this.http.patch(this.url, itemDetails, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

  removeFurniture(furnitureId) {
    console.log('item details', furnitureId)
    return this.http.delete<any>(`${this.url}/deletefurniture/${furnitureId}`,{
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

  removeProperty(propertyId) {
    console.log('item details', propertyId)
    return this.http.delete<any>(`${this.url}/deleteproperty/${propertyId}`,{
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

  
}
