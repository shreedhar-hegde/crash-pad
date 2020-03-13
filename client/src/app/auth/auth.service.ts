import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators'

interface LoginResponse {
  name: string,
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

  url = 'http://localhost:5000/user'
  name = ''
  auth
  signup(credentials) {
   return this.http.post(`${this.url}/signup`, credentials)
  }

  login(credentials) {
    return this.http.post<LoginResponse>(`${this.url}/login`, credentials).pipe(
      tap(({name}) => {
        console.log('name', name)
        this.loggedIn$.next(true)
      })
    )
  }

  checkAuth() {
    let token = JSON.parse(localStorage.getItem('token')).token.replace(/['"]+/g, '')
    this.auth = `bearer ${token}`

    return this.http.get<AuthResponse>(`${this.url}/auth`, {
      headers: new HttpHeaders({
        'Authorization': `${this.auth}`
      })
    }).pipe(
      tap((message) => {
        console.log('auth message', message)
        this.loggedIn$.next(true)
      })
    )
  }

}
