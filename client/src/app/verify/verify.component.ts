import { Component, OnInit } from '@angular/core';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private verify: VerifyService) { }

  ngOnInit() {
    this.verify.getUsers().subscribe(users => {
      console.log('users', users)
    })
  }

  onUpdateClick() {
    console.log('updated users')
  }

}
