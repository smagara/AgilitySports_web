import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbaRoutingModule } from './nba-routing.module';
import { NbaComponent } from './nba.component';


@NgModule({
  declarations: [
    NbaComponent
  ],
  imports: [
    CommonModule,
    NbaRoutingModule
  ]
})
export class NbaModule { }
