import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MlbComponent } from './mlb.component';
import { RosterComponent } from './components/roster/roster.component';

const routes: Routes = [
  {
    path: "mlb",
    children: [
      {
        path: 'roster',
        component: RosterComponent
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
  exports: [RouterModule]
})
export class MlbRoutingModule { }
