import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators'

interface LoginResponse {
  name: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {


  constructor(private http: HttpClient) { }
  
  loggedIn$ = new BehaviorSubject(null)

  url = 'http://localhost:5000/user'
  name = ''

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

}
