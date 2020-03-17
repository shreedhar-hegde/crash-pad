import { Component, OnInit } from '@angular/core';
import { VerifyService } from './verify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private verify: VerifyService) { }

  users = []

  verifyForm = new FormGroup({
    isVerified: new FormControl('')
  })

  modifiedUsers = []

  ngOnInit() {
    this.verify.getUsers().subscribe(users => {
      this.users = users['users']
      console.log('users', typeof this.users[0].isVerified)
    })
  }

  onVerifyChange(event, name) {
    console.log('event',name, event.target.value)
  }

  onUpdateClick(event) {
    event.preventDefault()
    console.log('updated users', this.verifyForm.value)
  }

}
