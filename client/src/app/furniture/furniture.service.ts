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

  constructor(private http: HttpClient) { 
    console.log('local storage', localStorage)
  }

  

  url = 'http://localhost:5000/furniture'


  // jwt:any = JSON.parse(localStorage.getItem('token')).jwt


  // auth = 'bearer ' + this.jwt

  getFurnitures() {
    console.log('loacl storage furniture', localStorage)
   return this.http.get(`${this.url}`, {
        headers : new HttpHeaders({
          'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
        })
    })
  }

  addFurniture(furniture) {
    return this.http.post(this.url, furniture, {
      headers: {
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
    }})
  }

  updateFruniture(furnitures) {
    console.log('service', furnitures)
    return this.http.patch(this.url, furnitures)
  }

  addFurnitureToCart(furnitureDetails) {
    return this.http.patch<any>(`${this.url}/addtocart`,furnitureDetails, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('token')).jwt
      })
    })
  }

}
