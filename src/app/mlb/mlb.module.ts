import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MlbRoutingModule } from './mlb-routing.module';
import { MlbComponent } from './mlb.component';
import { TableModule } from 'primeng/table';
import { RosterComponent } from './components/roster/roster.component';


@NgModule({
  declarations: [
    MlbComponent,
    RosterComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MlbRoutingModule
  ]
})
export class MlbModule { }
