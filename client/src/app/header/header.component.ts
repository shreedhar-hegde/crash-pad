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

  loggedIn:boolean = false;
  user
  constructor(private authService: AuthService, private router: Router) {
    
  }


  async ngOnInit() {

  this.authService.loggedIn$.subscribe(user => {
   
    if(user) {
      this.loggedIn = true
      this.user = user.name
      console.log('header', user)
    }
  })
  }

  onLogoutClick() {
    this.loggedIn = false;
    localStorage.clear()
    this.router.navigateByUrl('/')
  }


}
