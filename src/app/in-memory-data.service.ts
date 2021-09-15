import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FoodGroups } from './food-groups';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const isleNum = [
      { id: 1, name: 'Fruits' },
      { id: 2, name: 'Vegetables' },
      { id: 3, name: 'Grains' },
      { id: 4, name: 'Fresh Bakery' },
      { id: 5, name: 'Protein' },
      { id: 6, name: 'Dairy' },
      { id: 7, name: 'Frozen' },
      { id: 8, name: 'Liquor' },
      { id: 9, name: 'Household' },
      { id: 10, name: 'Pharmacy' }
    ];
    return {isleNum};
  }

  genId(isleNum: FoodGroups[]): number {
    return isleNum.length > 0 ? Math.max(...isleNum.map(foodGroups => foodGroups.id)) + 1 : 11;
  }
}
