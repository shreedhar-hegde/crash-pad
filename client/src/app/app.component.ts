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
  this.checkIsUserLoggedIn()
  }

  checkIsUserLoggedIn() {
    let checkAuth = this.authService.checkAuth()
    console.log('checkauth')
    if(checkAuth) {
      // checkAuth.subscribe(res => {
      //   console.log('response', res)
      //   if(res['message']) {
      //     this.authService.loggedIn$.next(true)
      //     console.log('emitted')
      //     this.router.navigateByUrl('/dashboard/furniture')
      //   }
      // })
  } else {
    localStorage.clear()
    this.router.navigateByUrl('/')
  }
}
}
