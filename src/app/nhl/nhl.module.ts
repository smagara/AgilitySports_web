import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms'; // Import FormsModule


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
    DialogModule,
    FormsModule,
    NhlRoutingModule
  ]
})
export class NhlModule { }
