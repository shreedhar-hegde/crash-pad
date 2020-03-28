import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface FurnitureResponse {
  name: String,
  price: Number,
  imageUrl: String
}

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) { }

  

  url = 'http://localhost:5000/furniture'

  jwt:any = JSON.parse(localStorage.getItem('token')).jwt


  auth = 'bearer ' + this.jwt

  getFurnitures() {
    console.log('token', this.jwt)
   return this.http.get(`${this.url}`, {
        headers : new HttpHeaders({
          'Authorization': this.auth
        })
    })
  }

  addFurniture(furniture) {
    return this.http.post(this.url, furniture, {
      headers: {
        'Authorization': this.auth 
      }
    })
  }

  updateFruniture(furnitures) {
    console.log('service', furnitures)
    return this.http.patch(this.url, furnitures)
  }

  addFurnitureToCart(furnitureDetails) {
    return this.http.patch<any>(`${this.url}/addtocart`,furnitureDetails, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

}
