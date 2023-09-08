import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaComponent } from './nba.component';

const routes: Routes = [{
  path: "nba",
  component: NbaComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NbaRoutingModule { }
