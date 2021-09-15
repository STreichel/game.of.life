import { Component, OnInit } from '@angular/core';
import { FoodGroups } from '../food-groups';
import { FoodGroupsService } from '../food-groups.service';

@Component({
  selector: 'app-food-groups',
  templateUrl: './food-groups.component.html',
  styleUrls: ['./food-groups.component.css'],
})
export class FoodGroupsComponent implements OnInit {
  isleNum: FoodGroups[] = [];

  constructor(private foodGroupsService: FoodGroupsService) {}

  ngOnInit(): void {
    this.getIsleNum();
  }

  getIsleNum(): void {
    this.foodGroupsService
      .getIsleNum()
      .subscribe((isleNum) => (this.isleNum = isleNum));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.foodGroupsService.addFoodGroups({ name } as FoodGroups)
      .subscribe(foodGroups => {
        this.isleNum.push(foodGroups);
      });
  }

  delete(foodGroups: FoodGroups): void {
    this.isleNum = this.isleNum.filter(h => h !== foodGroups);
    this.foodGroupsService.deleteFoodGroups(foodGroups.id).subscribe();
  }
}
