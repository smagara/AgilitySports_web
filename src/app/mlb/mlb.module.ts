import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MlbRoutingModule } from './mlb-routing.module';
import { MlbComponent } from './mlb.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';

import { RosterComponent } from './components/roster/roster.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendChartComponent } from './components/attend-chart/attend-chart.component';

@NgModule({
  declarations: [
    MlbComponent,
    RosterComponent,
    AttendanceComponent,
    AttendChartComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    ChartModule,
    MlbRoutingModule
  ]
})
export class MlbModule { }
