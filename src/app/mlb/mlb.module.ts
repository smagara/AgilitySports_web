import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MlbRoutingModule } from './mlb-routing.module';
import { MlbComponent } from './mlb.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../shared/shared.module';
import { StaticData } from '../staticdata/staticdata.module';

import { RosterComponent } from './components/roster/roster.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendChartComponent } from './components/attend-chart/attend-chart.component';
import { AttendDecadesComponent } from './components/attend-decades/attend-decades.component';
import { RosterListComponent } from './components/roster-list/roster-list.component';
import { RosterDetailComponent } from './components/roster-detail/roster-detail.component';

@NgModule({
  declarations: [
    MlbComponent,
    RosterComponent,
    RosterListComponent,
    RosterDetailComponent,
    AttendanceComponent,
    AttendChartComponent,
    AttendDecadesComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    ChartModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StaticData,
    MlbRoutingModule
  ]
})
export class MlbModule { }
