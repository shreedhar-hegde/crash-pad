import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  angleDown = faAngleDown

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSignupClick() {
    this.router.navigateByUrl('/signup')
  }

}
