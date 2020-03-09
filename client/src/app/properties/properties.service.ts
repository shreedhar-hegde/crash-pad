import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface PropertyResponse {
  name: String,
  propertyImage: String,
  price: Number,
  type: String,
  area: String
}

@Injectable({
  providedIn: 'root'
})


export class PropertiesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/property'
  token:string = localStorage.getItem('token')
  auth = 'bearer' + this.token

  getProperties() {
   return this.http.get<PropertyResponse>(`${this.url}`, {
        headers : new HttpHeaders({
          'Authorization': this.auth
        })
    })
  }
}
