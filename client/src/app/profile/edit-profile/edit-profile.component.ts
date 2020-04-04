import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private authService: AuthService ) { }

  name
  email
  phone
  address

  userForm

  user
  verified

  ngOnInit() {
    this.authService.loggedIn$.subscribe(user => {
      console.log('edit', user)
      this.user = user
      
      this.userForm = new FormGroup({
        name: new FormControl(user.name),
        email: new FormControl(user.email),
        phone: new FormControl(user.phone),
        address: new FormControl(user.address)
      })
      this.verified = user.isVerified
    })
  }

  onUpdateProfile(event) {
    event.preventDefault()
    console.log('user profile', this.userForm.value)

    let updateUser = {
      _id: this.user._id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      address: this.userForm.value.address
    }

    this.authService.updateProfile(updateUser).subscribe((res:any) => {
      console.log('updated profile', res)
      this.user = res.updatedUser
    })
  }





}
