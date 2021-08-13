import { Component, OnInit } from '@angular/core';
import { FoodGroups } from '../food-groups';
import { FoodGroupsService } from '../food-groups.service';

@Component({
  selector: 'app-food-groups',
  templateUrl: './food-groups.component.html',
  styleUrls: ['./food-groups.component.css']
})
export class FoodGroupsComponent implements OnInit {
  
  isleNum: FoodGroups[] = [];

  constructor(private foodGroupsService: FoodGroupsService) {}

  ngOnInit(): void {
    this.getIsleNum();
  }
 
  getIsleNum(): void {
    this.foodGroupsService.getIsleNum().subscribe(isleNum => this.isleNum = isleNum);
  }
}
