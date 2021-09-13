import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodGroupsComponent } from './food-groups/food-groups.component';
import { MostUsedComponent } from './most-used/most-used.component';
import { FoodGroupsDetailComponent } from './food-groups-detail/food-groups-detail.component';

const routes: Routes = [
  { path: 'isleNum', component: FoodGroupsComponent },
  { path: 'most-used', component: MostUsedComponent },
  { path: '', redirectTo: '/most-used', pathMatch: 'full' },
  { path: 'detail/:id', component: FoodGroupsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
