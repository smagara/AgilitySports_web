import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionDropdownComponent } from '../staticdata/components/position-dropdown.component';

@NgModule({
  declarations: [
    PositionDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PositionDropdownComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StaticData { }