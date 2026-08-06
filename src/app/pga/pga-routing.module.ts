import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgaComponent } from './components/pga.component';
import { RosterComponent } from './components/roster/roster.component';

const routes: Routes = [
  {
    path: 'pga',
    children: [
      {
        path: 'roster',
        component: RosterComponent
      },
      {
        path: '',
        component: PgaComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgaRoutingModule { }
