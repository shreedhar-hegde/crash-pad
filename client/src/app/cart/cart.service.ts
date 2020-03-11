import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/cart'
  token:string = localStorage.getItem('token')
  auth = 'bearer' + this.token

  getCart() {
    return this.http.get(this.url, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }
}
