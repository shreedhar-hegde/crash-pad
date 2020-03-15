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
    console.log('reacher here');
    event.preventDefault()
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: response => {
        console.log('response', response)
        localStorage.setItem('token', JSON.stringify(response))
        this.authService.header$.next(true)
        console.log('header log')
        this.router.navigateByUrl('/dashboard/furniture')
      }
    })
    
  }



}
