import { Component, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playground';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    let token = localStorage.getItem('token')
    if(token) {
      if(JSON.parse(token).user.role === 'verifier'){
        this.authService.loggedIn$.next(JSON.parse(token).user)
      this.router.navigateByUrl('/verify')
      }
      else if(token) {
        this.router.navigateByUrl('/dashboard/furniture')
    } else {
      this.router.navigateByUrl('/')
    }
      
    } 
  }
}
