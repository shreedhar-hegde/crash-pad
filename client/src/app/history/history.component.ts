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
  contents = []

  ngOnInit() {

    this.historyService.getHistory().subscribe((res:any) => {
      console.log('get history', res)
      this.items = res.soldItems
      if(res.soldItems.length > 0) {
        this.items[0].furniture.forEach(item => {
          this.contents.push(item)
        });
        this.items[0].property.forEach(item => {
          this.contents.push(item)
        })
      }
      console.log('content', this.contents)
    })

     
    } 

}