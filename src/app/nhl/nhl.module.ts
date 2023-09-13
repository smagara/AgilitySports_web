import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';


import { NhlRoutingModule } from './nhl-routing.module';
import { NhlComponent } from './nhl.component';
import { RosterComponent } from './components/roster/roster.component';


@NgModule({
  declarations: [
    NhlComponent,
    RosterComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    NhlRoutingModule
  ]
})
export class NhlModule { }
