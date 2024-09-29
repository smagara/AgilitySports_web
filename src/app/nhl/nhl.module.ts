import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { StaticData } from '../staticdata/staticdata.module';
import { RosterComponent } from './components/roster/roster.component';
import { NhlRoutingModule } from './nhl-routing.module';
import { NhlComponent } from './nhl.component';

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
    ReactiveFormsModule,
    StaticData,
    NhlRoutingModule
  ]
})
export class NhlModule { }
