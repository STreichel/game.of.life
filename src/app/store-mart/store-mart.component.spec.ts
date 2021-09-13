import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMartComponent } from './store-mart.component';

describe('StoreMartComponent', () => {
  let component: StoreMartComponent;
  let fixture: ComponentFixture<StoreMartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreMartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
