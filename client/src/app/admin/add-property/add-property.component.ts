import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PropertiesService } from 'src/app/properties/properties.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  constructor(private propertyService: PropertiesService) { }

  name
  area
  costPerMonth
  propertyImage
  type
  noOfRooms

  propertyForm = new FormGroup({
    name: new FormControl(''),
    area: new FormControl(''),
    costPerMonth: new FormControl(''),
    propertyImage: new FormControl(''),
    type: new FormControl(''),
    noOfRooms: new FormControl('')
  })


  ngOnInit() {
  }

  onUrlChange(url) {
    this.propertyImage = url
  }

  onNameChange

  onSubmit(){
    console.log('add property', this.propertyForm.value)
    this.propertyService.addProperty(this.propertyForm.value).subscribe(res => {
      console.log('property post res', res)
    })
  }

}
