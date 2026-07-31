import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';
import { StaticData } from '../staticdata/staticdata.module';
import { FifRoutingModule } from './fif-routing.module';

import { FifComponent } from './components/fif.component';
import { RosterComponent } from './components/roster/roster.component';
import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';

@NgModule({
  declarations: [
    FifComponent,
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
    FifRoutingModule,
    RouterModule
  ],
  exports: [FifComponent]
})
export class FifModule { }
