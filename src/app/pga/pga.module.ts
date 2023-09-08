import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgaRoutingModule } from './pga-routing.module';
import { PgaComponent } from './pga.component';
import { SeasonComponent } from './components/season/season.component';
import { TournamentComponent } from './components/tournament/tournament.component';


@NgModule({
  declarations: [
    PgaComponent,
    SeasonComponent,
    TournamentComponent
  ],
  imports: [
    CommonModule,
    PgaRoutingModule
  ]
})
export class PgaModule { }
