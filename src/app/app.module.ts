import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NflModule } from './nfl/nfl.module';
import { NbaModule } from './nba/nba.module';
import { NhlModule } from './nhl/nhl.module';
import { MlbModule } from './mlb/mlb.module';
import { PgaModule } from './pga/pga.module';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TieredMenuModule,
    ChartModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
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
