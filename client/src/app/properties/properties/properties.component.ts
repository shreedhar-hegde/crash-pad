import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties
  constructor(private propertyService: PropertiesService) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe((res:any) => {
      
      this.properties = res.properties
    })
  }

}
