import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MegaMenuModule } from 'primeng/megamenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NflModule } from './nfl/nfl.module';
import { NbaModule } from './nba/nba.module';
import { NhlModule } from './nhl/nhl.module';
import { MlbModule } from './mlb/mlb.module';
import { PgaModule } from './pga/pga.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MegaMenuModule,
    AppRoutingModule,
    NflModule,
    NbaModule,
    NhlModule,
    MlbModule,
    PgaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
