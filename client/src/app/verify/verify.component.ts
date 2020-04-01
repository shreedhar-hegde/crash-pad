import { Component, OnInit } from '@angular/core';
import { VerifyService } from './verify.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private verifyService: VerifyService, private fb: FormBuilder) { }

  verifiedUsers: Array<any> = [];
  users: Array<any> = []

  ngOnInit() {

    this.verifyService.getUsers().subscribe(users => {
      this.users = users['users']
      this.users.map(user => user.isVerified ? this.verifiedUsers.push(user._id): false)
      console.log('users', this.users)
    })
  }

  onChange(user:string, isChecked: boolean) {
    if(isChecked) {
      this.verifiedUsers.push(user);
      console.log('onchange', this.verifiedUsers)
    } else {
      let index = this.verifiedUsers.indexOf(user);
      this.verifiedUsers.splice(index,1);
      console.log('onchange', this.verifiedUsers)
    }
}

  onUpdateClick(event) {
    event.preventDefault()

    console.log('onupdateclick')
   
    this.users.map(user => {
       return this.verifiedUsers.indexOf(user._id) >= 0 ? user.isVerified = true : user.isVerified = false
     })

    console.log('on update click final', this.users)



    this.verifyService.verify(this.users).subscribe(res =>{
      console.log('verify res', res)
    })
   

    
  }

}
