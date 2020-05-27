import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms'
import { MatchPassword } from '../match-password';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  notificationMessage = ''
  isModalActive = false


  constructor(
    private matchPassword: MatchPassword, 
    private router: Router,
    private authService: AuthService
     ) { }

  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    contact: new FormControl('', [
      Validators.required, Validators.pattern("[0-9 ]{10}")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  }, { validators: this.matchPassword.validate })

  ngOnInit() {
  }

  onSubmit(event) {

    event.preventDefault()
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe((res:any) => {
      if(res.success) {
        this.router.navigateByUrl('/login')
      }
    }, (err) => {
      this.isModalActive = true
      this.notificationMessage = 'User with this email id exists, please try another'
      setTimeout(() => {
        this.isModalActive = false
      }, 3000)
    })
  }

  onReset() {
    this.signupForm.reset()
  }


}
