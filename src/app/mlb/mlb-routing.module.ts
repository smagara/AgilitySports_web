import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MlbComponent } from './mlb.component';

const routes: Routes = [{
  path: "mlb",
  component: MlbComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MlbRoutingModule { }
