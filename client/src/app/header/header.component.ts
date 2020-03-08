import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // isLoggedIn$;
  loggedIn:boolean = false;
  constructor(private authService: AuthService, private router: Router) {
  
  }

  ngOnInit() {
    console.log('logged in', this.authService.loggedIn$)
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
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
