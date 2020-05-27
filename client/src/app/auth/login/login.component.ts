import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms'
import {Router} from '@angular/router'
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  notificationMessage = ''
  isModalActive = false

  constructor( private router: Router, private authService: AuthService) { }


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  })

  ngOnInit() {
  }

  onLogin(event) {
    event.preventDefault()
    console.log('on login')
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(res => {
        console.log('login response', res)
        localStorage.setItem('token', JSON.stringify(res))
        console.log('after setup', localStorage)
        if(res.user.role === 'verifier') {
          this.router.navigateByUrl('/verify')
        } else {
          this.router.navigateByUrl('/dashboard/furniture')
        }
    }, (err) => {
      this.isModalActive = true

      this.notificationMessage = 'Invalid Email or Password'
        setTimeout(() => {
          this.isModalActive = false
        }, 3000)
  
    })
    
  }



}
