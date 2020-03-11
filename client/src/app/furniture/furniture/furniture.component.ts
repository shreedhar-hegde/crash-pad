import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';

interface FurnitureResponse {
  name: String,
  price: Number,
  furnitureImage: String
}

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {

  isModalActive: boolean = false;
  furnitures
  constructor(private furnitureService: FurnitureService) { }

  ngOnInit() {
    this.furnitureService.getFurnitures().subscribe((res:any) => {
      this.furnitures = res.furnitures
      console.log(this.furnitures)
    })
    
  }

  



  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
