import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/furniture/furniture.service';
import { PropertiesService } from 'src/app/properties/properties.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

interface FurnitureResponse {
  name: String,
  price: Number,
  imageUrl: String
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  furnitures
  properties
  editing = false

  users

  updatedFrunitures = []
  updatedProperties = []

  constructor(private furnitureService: FurnitureService, private propertiesService: PropertiesService, private authService: AuthService) { }

  ngOnInit() {
     this.furnitureService.getFurnitures().subscribe((res:any) => {
      this.furnitures = res.furnitures
      this.furnitures.edit = false
      console.log('furnitures', this.furnitures)
    })

    this.propertiesService.getProperties().subscribe((res:any )=> {
      this.properties = res.properties
      this.furnitures.edit = false
      console.log('properties', this.properties)
    })

    this.authService.getUsers().subscribe((res:any) => {
      console.log('users', res.users)
      this.users = res.users
    })
  }


  onNameChange(id, value) {
    console.log('name change', id, value)
    this.furnitures.map(furniture => {
      if(furniture._id === id) {
        furniture.name = value
        this.updatedFrunitures.push(furniture)
      }
    })
  }

  onUrlChange(id, value) {
    console.log('url change', id, value)
     this.furnitures.map(furniture => {
      if(furniture._id === id) {
        furniture.imageUrl = value
        this.updatedFrunitures.push(furniture)

      }
    })
  }

  onPriceChange(id, value) {
    console.log('price change', id, value)
   this.furnitures.map(furniture => {
      if(furniture._id === id) {
        furniture.price = value
        this.updatedFrunitures.push(furniture)
      }
    })
  }

  onUpdateFurnitureClick() {
    this.furnitureService.updateFruniture(this.updatedFrunitures).subscribe((res:any) => {
      console.log('update res', res)
      if(res.success) {
        this.furnitureService.getFurnitures().subscribe((res:any) => {
          console.log('get in update', res)
          this.furnitures = res.furnitures
        })
      }
    }
    )
  }

  onDeleteFurnitureClick(furnitureId) {
    this.furnitureService.deleteFurniture(furnitureId).subscribe(res => {
      console.log('delete furniture res', res)
    })
  }


  onPropertyNameChange(id, name) {
    console.log('name change', id, name)
    this.properties.map(property => {
      if(property._id === id) {
        property.name = name
        this.updatedProperties.push(property)
      }
    })
  }

  onPropertyImageChange(id, url) {
    this.properties.map(property => {
      if(property._id === id) {
        property.propertyImage = url
        this.updatedProperties.push(property)
      }
    })
  }

  onTypeChange(id, type) {
    this.properties.map(property => {
      if(property._id === id) {
        property.type = type
        this.updatedProperties.push(property)
      }
    })
  }

  onAreaChange(id, area) {
    this.properties.map(property => {
      if(property._id === id) {
        property.area = area
        this.updatedProperties.push(property)
      }
    })
  }

  onnoOfRoomsChange(id, numberOfRooms) {
    this.properties.map(property => {
      if(property._id === id) {
        property.numberOfRooms = numberOfRooms
        this.updatedProperties.push(property)
      }
    })
  }

  onCostPerMonthChange(id, costPerMonth) {
    this.properties.map(property => {
      if(property._id === id) {
        property.costPerMonth = costPerMonth
        this.updatedProperties.push(property)
      }
    })
  }


  onPropertyUpdateClick() {
    console.log('updated properties', this.updatedProperties)
    this.propertiesService.updateProperty(this.updatedProperties).subscribe((res:any) => {
      console.log('update res', res)
      if(res.success) {
        this.propertiesService.getProperties().subscribe((res:any) => {
          console.log('get in update', res)
          this.properties = res.properties
        })
      }
    }
    )
  }

  onPropertyDeleteClick(propertyId) {
    this.propertiesService.deleteProperty(propertyId).subscribe(res => {
      console.log('delete res', res)
    })
  }
  


}
