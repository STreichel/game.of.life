import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';

import { SimulatorComponent } from './simulator/simulator.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { CheckersComponent } from './checkers/checkers.component';

import { StoreMartComponent } from './store-mart/store-mart.component';
import { FoodGroupsComponent } from './food-groups/food-groups.component';
import { FoodGroupsDetailComponent } from './food-groups-detail/food-groups-detail.component';
import { MostUsedComponent } from './most-used/most-used.component';
import { MessagesComponent } from './messages/messages.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCrown, faYinYang } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    TicTacToeComponent,
    CheckersComponent,
    StoreMartComponent,
    FoodGroupsComponent,
    FoodGroupsDetailComponent,
    MessagesComponent,
    MostUsedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatCardModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private library: FaIconLibrary){
    library.addIcons(faCrown, faYinYang);
  }
}