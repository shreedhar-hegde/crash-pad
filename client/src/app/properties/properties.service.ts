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
  token:any = localStorage.getItem('token')
  auth = 'bearer' + this.token.jwt

  getProperties() {
   return this.http.get<PropertyResponse>(`${this.url}`, {
        headers : new HttpHeaders({
          'Authorization': this.auth
        })
    })
  }

  addProperty(property) {
    return this.http.post(this.url, property)
  }

  updateProperty(updatedProperties) {
    console.log('service', updatedProperties)
    return this.http.patch(this.url, updatedProperties)
  }

  addPropertyToCart(propertyDetails) {
    return this.http.patch<any>(`${this.url}/addtocart`,propertyDetails, {
      headers: new HttpHeaders({
        'Authorization': this.auth
      })
    })
  }

  deleteProperty(propertyId) {
    return this.http.delete(`${this.url}/${propertyId}`)
  }
}
