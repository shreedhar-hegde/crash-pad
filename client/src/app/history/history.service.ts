import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/rent'

  userid = JSON.parse(localStorage.getItem('token')).user._id

  getHistory() {
    console.log('userid', this.userid)
    return this.http.get(`${this.url}/${this.userid}`)
  }
  
}
