import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { FoodGroups } from '../food-groups';
import { FoodGroupsService } from '../food-groups.service';

@Component({
  selector: 'app-food-groups-search',
  templateUrl: './food-groups-search.component.html',
  styleUrls: ['./food-groups-search.component.css']
})
export class FoodGroupsSearchComponent implements OnInit {

  isleNum$!: Observable<FoodGroups[]>;
  private searchTerms = new Subject<string>();

  constructor(private foodGroupsService: FoodGroupsService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.isleNum$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.foodGroupsService.searchIsleNum(term)),
    );
  }

}
