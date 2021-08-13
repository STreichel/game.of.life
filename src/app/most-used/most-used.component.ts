import { Component, OnInit } from '@angular/core';

import { FoodGroups } from '../food-groups';
import { FoodGroupsService } from '../food-groups.service';

@Component({
  selector: 'app-most-used',
  templateUrl: './most-used.component.html',
  styleUrls: ['./most-used.component.css']
})
export class MostUsedComponent implements OnInit {

  isleNum: FoodGroups[] = [];

  constructor(private foodGroupsService: FoodGroupsService) { }

  ngOnInit(): void {
    this.getIsleNum();
  }
  
  getIsleNum(): void {
    this.foodGroupsService.getIsleNum()
      .subscribe(isleNum => this.isleNum = isleNum.slice(1, 5));
  }
}
