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
  header$ = new BehaviorSubject(null)

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
        this.loggedIn$.next(name)
      })
    )
  }

  // checkAuth() {
  //   let token = localStorage.getItem('token')
  //   console.log('token', token)
  //   if(token) {
  //     console.log('checkauth:token', token);
      
  //     token = JSON.parse(token).token
  //     token.replace(/['"]+/g, '')
  //     this.auth = `bearer ${token}`

  //   return this.http.get(`${this.url}/auth`,{headers:{
  //     'Authorization': `${this.auth}`
  //   }})
    // .subscribe(res => {
    //   console.log('checkauthres',res)
    //   this.header$.next(true)
    //   this.loggedIn$.next(true)
    // }, err => {
    //   console.log('err: checkAuth',err);
    // })

    // return this.http.get<AuthResponse>(`${this.url}/auth`, {
    //   headers: new HttpHeaders({
    //     'Authorization': `${this.auth}`
    //   })
    // }).pipe(
    //   tap((message) => {
    //     console.log('auth message', message)
    //     this.header$.next(true)
    //     this.loggedIn$.next(true)
    //   })
    // )
  // } 
  // else {
  //   return false
  // }
  // } 
    // }
  // }

    

}
