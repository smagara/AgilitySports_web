import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MlbRoutingModule } from './mlb-routing.module';
import { MlbComponent } from './mlb.component';


@NgModule({
  declarations: [
    MlbComponent
  ],
  imports: [
    CommonModule,
    MlbRoutingModule
  ]
})
export class MlbModule { }
