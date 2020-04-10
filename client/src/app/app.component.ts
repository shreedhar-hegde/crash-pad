import { Component, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playground';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    console.log('ngonint')
    let token = localStorage.getItem('token')
    if(token) {
      console.log('app token', token)
      if(JSON.parse(token).user.role === 'verifier'){
        let user = JSON.parse(token).user
        console.log('app user', user)
        this.authService.loggedIn$.next(user)
      this.router.navigateByUrl('/verify')
      }
      else if(token) {
        console.log('ngonint here')
        let user = JSON.parse(token).user
        this.authService.loggedIn$.next(user)
        // this.router.navigateByUrl('/dashboard/furniture')
    } else {
      this.router.navigateByUrl('/')
    }
      
    } 
  }
}
