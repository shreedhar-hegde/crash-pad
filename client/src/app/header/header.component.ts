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
  //   console.log('header onint')
  //   this.user = await this.getName()
  //   // this.user = JSON.parse(localStorage.getItem('token')).name
  //   console.log('header', this.user)
  //   console.log('logged in header', this.authService.header$)
  //   this.authService.header$.subscribe(loggedIn => {
  //     this.loggedIn = loggedIn;
  //     console.log('loggedin', this.loggedIn)
  //  })

  this.authService.loggedIn$.subscribe(name => {
    console.log('header auth res',name )
    if(name) {
      this.loggedIn = true
      this.user = name
    }
  })
  }

  onLogoutClick() {
    console.log('logout')
  //  this.isLoggedIn$ = false
  this.loggedIn = false;
  this.authService.header$.next(false)
  console.log('logout', this.loggedIn)
  localStorage.clear()

  console.log('onLogoutClick: loggedIn', this.loggedIn); 
   this.router.navigateByUrl('/')
  }


}
