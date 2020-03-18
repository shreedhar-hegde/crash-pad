import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  verified
  ngOnInit() {
    this.authService.loggedIn$.subscribe(user => {
      console.log('edit', user)
      this.verified = user.isVerified
    })
  }



}
