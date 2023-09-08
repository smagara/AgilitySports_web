import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhlComponent } from '../nhl/nhl.component';

const routes: Routes = [{
  path: "nhl",
  component: NhlComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhlRoutingModule { }
