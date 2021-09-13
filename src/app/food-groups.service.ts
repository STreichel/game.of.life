import { Injectable } from '@angular/core';
import { FoodGroups } from './food-groups';
import { ISLES } from './isle-food-groups';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class FoodGroupsService {
  constructor(private messageService: MessageService) {}

  getIsleNum(): Observable<FoodGroups[]> {
    const isleNum = of(ISLES);
    this.messageService.add('FoodGroupsService: fetched isleNum');
    return isleNum;
  }

  getFoodGroups(id: number): Observable<FoodGroups> {
    const foodGroups = ISLES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(foodGroups);
  }
}
