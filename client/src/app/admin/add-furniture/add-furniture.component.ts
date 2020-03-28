import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FurnitureService } from 'src/app/furniture/furniture.service';

@Component({
  selector: 'app-add-furniture',
  templateUrl: './add-furniture.component.html',
  styleUrls: ['./add-furniture.component.css']
})
export class AddFurnitureComponent implements OnInit {


  constructor(private propertyService: FurnitureService) { }

  name
  price
  imageUrl

  furnitureForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    imageUrl: new FormControl(''),
  })


  ngOnInit() {
  }

  onUrlChange(url) {
    this.imageUrl = url
  }

  onNameChange

  onSubmit(){
    console.log('add property', this.furnitureForm.value)
    this.propertyService.addFurniture(this.furnitureForm.value).subscribe(res => {
      console.log('furniture post res', res)
    })
  }

}
