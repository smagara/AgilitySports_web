import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';
import { StaticData } from '../staticdata/staticdata.module';
import { RosterComponent } from './components/roster/roster.component';
import { NbaRoutingModule } from './nba-routing.module';
import { NbaComponent } from './nba.component';

import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';

@NgModule({
  declarations: [
    NbaComponent,
    RosterComponent,
    RosterListComponent,
    RosterDetailComponent
    ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StaticData,
    NbaRoutingModule
  ]
})
export class NbaModule { }
