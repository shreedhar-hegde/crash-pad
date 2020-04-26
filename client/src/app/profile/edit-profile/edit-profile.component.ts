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
  photoid
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
        contact: new FormControl(user.contact),
        address: new FormControl(user.address),
        photoid: new FormControl('')
      })
      this.verified = user.isVerified
    })
  }

  photoIdChange(event) {
    this.photoid = event.target.files[0]
  }

  onUpdateProfile(event) {
    event.preventDefault()
    console.log('user profile', this.userForm.value)

    // let updateUser = {
      
    //   name: this.userForm.value.name,
    //   email: this.userForm.value.email,
    //   phone: this.userForm.value.phone,
    //   address: this.userForm.value.address
    // }

    let formData = new FormData()
    formData.append('_id',this.user._id)
    formData.append('photoid', this.photoid)
    formData.append('name', this.userForm.value.name)
    formData.append('email', this.userForm.value.email)
    formData.append('contact', this.userForm.value.contact)
    formData.append('address', this.userForm.value.address)

    this.authService.updateProfile(formData).subscribe((res:any) => {
      console.log('updated profile', res)
      this.user = res.updatedUser
    })
  }





}
