import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators'

interface LoginResponse {
  user: {
    role: Object
  },
  token: string
}

interface AuthResponse {
  auth: boolean
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {


  constructor(private http: HttpClient) { }
  
  loggedIn$ = new BehaviorSubject(null)
  header$ = new BehaviorSubject(null)

  url = 'http://localhost:5000/user'
  name = ''
  auth
  signup(credentials) {
   return this.http.post(`${this.url}/signup`, credentials)
  }

  login(credentials) {
    return this.http.post<LoginResponse>(`${this.url}/login`, credentials).pipe(
      tap(({user}) => {
        console.log('pipe user', user)
        this.loggedIn$.next(user)
      })
    )
  }

  updateProfile(updatedUser) {
    return this.http.patch(`${this.url}/updateprofile`, updatedUser)
  }

  getUsers() {
    return this.http.get(`${this.url}`)
  }



}
