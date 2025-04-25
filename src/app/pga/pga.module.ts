import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PgaComponent } from './components/pga.component';
import { SeasonComponent } from './components/season/season.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { PgaRoutingModule } from './pga-routing.module';

@NgModule({
  declarations: [
    PgaComponent,
    SeasonComponent,
    TournamentComponent
  ],
  imports: [
    CommonModule,
    PgaRoutingModule,
    RouterModule
  ],
  exports: [PgaComponent]
})
export class PgaModule { }
