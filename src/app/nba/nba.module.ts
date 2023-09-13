import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';

import { NbaRoutingModule } from './nba-routing.module';
import { NbaComponent } from './nba.component';
import { RosterComponent } from './components/roster/roster.component';


@NgModule({
  declarations: [
    NbaComponent,
    RosterComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    NbaRoutingModule
  ]
})
export class NbaModule { }
