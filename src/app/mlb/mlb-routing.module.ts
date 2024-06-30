import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MlbComponent } from './mlb.component';
import { RosterComponent } from './components/roster/roster.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendChartComponent } from './components/attend-chart/attend-chart.component';
import { AttendDecadesComponent } from './components/attend-decades/attend-decades.component';

const routes: Routes = [
  {
    path: "mlb",
    children: [
      {
        path: 'roster',
        component: RosterComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
      },
      {
        path: 'attend-chart',
        component: AttendChartComponent,
      },
      {
        path: 'attend-decades',
        component: AttendDecadesComponent,
      },
      {
        path: '',
        component: MlbComponent,
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule]
})
export class MlbRoutingModule { }
