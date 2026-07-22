import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandednessDropdownComponent } from '../staticdata/components/handedness-dropdown.component';
import { LeagueDropdownComponent } from '../staticdata/components/league-dropdown.component';
import { PositionDropdownComponent } from '../staticdata/components/position-dropdown.component';

@NgModule({
  declarations: [
    PositionDropdownComponent,
    LeagueDropdownComponent,
    HandednessDropdownComponent
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StaticData { }