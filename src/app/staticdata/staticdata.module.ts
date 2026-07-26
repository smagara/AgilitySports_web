import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandednessDropdownComponent } from '../staticdata/components/handedness-dropdown.component';
import { LeagueDropdownComponent } from '../staticdata/components/league-dropdown.component';
import { PositionDropdownComponent } from '../staticdata/components/position-dropdown.component';
import { TeamDropdownComponent } from '../staticdata/components/team-dropdown.component';

@NgModule({
  declarations: [
    PositionDropdownComponent,
    LeagueDropdownComponent,
    HandednessDropdownComponent,
    TeamDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PositionDropdownComponent,
    LeagueDropdownComponent,
    HandednessDropdownComponent,
    TeamDropdownComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StaticData { }