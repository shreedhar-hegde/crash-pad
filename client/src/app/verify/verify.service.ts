import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsersResponse {
  name: String,
  email: String,
  isVerfied: Boolean,
  address: String,
  phone: String,
  role: String
}

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/user'

  getUsers() {
    return this.http.get<UsersResponse>(`${this.url}/verify`)
  }

  verify(updatedUsers) {
    return this.http.put(`${this.url}/verify`, updatedUsers)
  }
}
