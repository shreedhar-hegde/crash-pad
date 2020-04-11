import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/rent'

  getHistory() {
    return this.http.get(`${this.url}`)
  }
  
}
