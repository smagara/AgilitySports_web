import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { NflComponent } from './components/nfl.component';
import { RosterComponent } from './components/roster/roster.component';
import { NflRoutingModule } from './nfl-routing.module';

import { SharedModule } from '../shared/shared.module';
import { StaticData } from '../staticdata/staticdata.module';

import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';

@NgModule({
  declarations: [
    NflComponent,
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
    NflRoutingModule,
    RouterModule
  ],
  exports: [NflComponent]
})
export class NflModule { }
