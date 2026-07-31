import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FifComponent } from './components/fif.component';
import { RosterComponent } from './components/roster/roster.component';

const routes: Routes = [
  {
    path: 'fif',
    children: [
      {
        path: 'roster',
        component: RosterComponent
      },
      {
        path: '',
        component: FifComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FifRoutingModule { }
