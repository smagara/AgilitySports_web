import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhlComponent } from '../nhl/nhl.component';
import { RosterComponent } from './components/roster/roster.component';

const routes: Routes = [
  {
    path: "nhl",
    children: [
      {
        path: 'roster',
        component: RosterComponent
      },
      {
        path: '',
        component: NhlComponent,
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhlRoutingModule { }
