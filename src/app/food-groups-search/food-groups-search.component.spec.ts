import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGroupsSearchComponent } from './food-groups-search.component';

describe('FoodGroupsSearchComponent', () => {
  let component: FoodGroupsSearchComponent;
  let fixture: ComponentFixture<FoodGroupsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodGroupsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodGroupsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
