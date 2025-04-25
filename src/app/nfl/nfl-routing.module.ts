import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NflComponent } from './components/nfl.component';
import { RosterComponent } from './components/roster/roster.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  {
    path: "nfl",
    children: [
      {
        path: 'roster',
        component: RosterComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'team',
        component: TeamComponent
      },
      {
        path: '',
        component: NflComponent,
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NflRoutingModule { }
