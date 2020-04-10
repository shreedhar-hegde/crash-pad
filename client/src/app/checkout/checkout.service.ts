import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/rent'

  checkout(payload) {
    return  this.http.post(`${this.url}`, payload)
  }
}
