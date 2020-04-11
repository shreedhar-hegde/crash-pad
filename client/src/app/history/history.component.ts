import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService) { }
  items
  furnitures = []
  properties = []

  ngOnInit() {

    this.historyService.getHistory().subscribe((res:any) => {
      console.log('res', res)
      this.items = res.soldItems
      this.items[0].furniture.forEach(item => {
        this.furnitures.push(item)
      });
      this.items[0].property.forEach(item => {
        this.properties.push(item)
      })
    })

     
    } 

}