import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { resolve } from 'url';
import { LoginComponent } from '../auth/login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // isLoggedIn$;
  loggedIn:boolean = false;
  user
  constructor(private authService: AuthService, private router: Router) {
    
  }

  getName() {
    return new Promise(
      (resolve, reject) => {
        let token = localStorage.getItem('token')
      if(token) {
        resolve( JSON.parse(token).name)
      }
      }
    )
  }


  async ngOnInit() {
    this.user = await this.getName()
    // this.user = JSON.parse(localStorage.getItem('token')).name
    console.log('header', this.user)
    console.log('logged in header', this.authService.header$)
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      console.log('loggedin', this.loggedIn)
   })
  }

  onLogoutClick() {
    console.log('logout')
   localStorage.clear()
  //  this.isLoggedIn$ = false
  this.loggedIn = false;
  console.log('onLogoutClick: loggedIn', this.loggedIn); 
   this.router.navigateByUrl('/')
  }


}
