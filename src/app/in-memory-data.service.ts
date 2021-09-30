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
    this.sortByName(isleNum);
    return {isleNum};
  }

  genId(isleNum: FoodGroups[]): number {
    return isleNum.length > 0 ? Math.max(...isleNum.map(foodGroups => foodGroups.id)) + 1 : 11;
  }

  // make itemsList be the string of the name in the array
  sortByName (itemsList: { name: string }[]){
    for(let i = 0; i < itemsList.length; i++){
      let j = i - 1;
      let key = itemsList[i];
      while(j >= 0 && itemsList[j].name > key.name){
        itemsList[j + 1] = itemsList[j];
        j = j - 1;
      }
      itemsList[j + 1] = key;
    }
    return itemsList;
  }
}
