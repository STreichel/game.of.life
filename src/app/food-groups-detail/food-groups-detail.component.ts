import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FoodGroups } from '../food-groups';
import { FoodGroupsService } from '../food-groups.service';

@Component({
  selector: 'app-food-groups-detail',
  templateUrl: './food-groups-detail.component.html',
  styleUrls: ['./food-groups-detail.component.css'],
})
export class FoodGroupsDetailComponent implements OnInit {
  foodGroups: FoodGroups | undefined;

  constructor(
    private route: ActivatedRoute,
    private foodGroupsService: FoodGroupsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFoodGroups();
  }

  getFoodGroups(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodGroupsService
      .getFoodGroups(id)
      .subscribe((foodGroups) => (this.foodGroups = foodGroups));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    if (this.foodGroups){
      this.foodGroupsService.updateFoodGroups(this.foodGroups)
        .subscribe(() => this.goBack());
    }
  }
}
