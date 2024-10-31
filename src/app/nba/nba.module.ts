import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DialogModule } from 'primeng/dialog';

import { NbaRoutingModule } from './nba-routing.module';
import { NbaComponent } from './nba.component';
import { RosterComponent } from './components/roster/roster.component';
import { StaticData } from '../staticdata/staticdata.module';


@NgModule({
  declarations: [
    NbaComponent,
    RosterComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    StaticData,
    NbaRoutingModule
  ]
})
export class NbaModule { }
