import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface FurnitureResponse {
  name: String,
  price: Number,
  furnitureImage: String
}

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) { }

  

  url = 'http://localhost:5000/furniture'
  token:string = localStorage.getItem('token')
  auth = 'bearer' + this.token

  getFurnitures() {
   return this.http.get<FurnitureResponse>(`${this.url}`, {
        headers : new HttpHeaders({
          'Authorization': this.auth
        })
    })
  }

  updateFurniture(furnitureDetails) {
    return this.http.put<any>(`${this.url}`,furnitureDetails, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

}
