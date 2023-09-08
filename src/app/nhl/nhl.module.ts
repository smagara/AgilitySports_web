import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NhlRoutingModule } from './nhl-routing.module';
import { NhlComponent } from './nhl.component';


@NgModule({
  declarations: [
    NhlComponent
  ],
  imports: [
    CommonModule,
    NhlRoutingModule
  ]
})
export class NhlModule { }
