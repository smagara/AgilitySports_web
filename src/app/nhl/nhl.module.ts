import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { StaticData } from '../staticdata/staticdata.module';
import { RosterComponent } from './components/roster/roster.component';
import { NhlRoutingModule } from './nhl-routing.module';
import { NhlComponent } from './nhl.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';
import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';

@NgModule({
  declarations: [
    NhlComponent,
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
    StaticData,
    NhlRoutingModule
  ]
})
export class NhlModule { }
