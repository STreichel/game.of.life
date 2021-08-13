import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGroupsDetailComponent } from './food-groups-detail.component';

describe('FoodGroupDetailComponent', () => {
  let component: FoodGroupsDetailComponent;
  let fixture: ComponentFixture<FoodGroupsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodGroupsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodGroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
