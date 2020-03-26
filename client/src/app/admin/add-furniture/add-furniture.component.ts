import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-furniture',
  templateUrl: './add-furniture.component.html',
  styleUrls: ['./add-furniture.component.css']
})
export class AddFurnitureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('add furniture')
  }

}
