import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';
import { StaticData } from '../staticdata/staticdata.module';
import { PgaRoutingModule } from './pga-routing.module';

import { PgaComponent } from './components/pga.component';
import { RosterComponent } from './components/roster/roster.component';
import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';

@NgModule({
  declarations: [
    PgaComponent,
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
    PgaRoutingModule,
    RouterModule
  ],
  exports: [PgaComponent]
})
export class PgaModule { }
