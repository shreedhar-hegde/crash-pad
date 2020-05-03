import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/cart'


  getCart() {
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

  removeFurniture(furnitureId, userId) {
    return this.http.delete<any>(`${this.url}/removefruniture-from-cart/${userId}/${furnitureId}`)
  }

  removeProperty(propertyId, userId) {
    console.log('remove property', propertyId, userId)
    return this.http.delete<any>(`${this.url}/removeproperty-from-cart/${userId}/${propertyId}`)
  }

}
