import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrimDirective } from '../common/directives/trim.directive';
import { HeightPipe } from '../common/pipes/height.pipe';
import { TeamShortPipe } from '../common/pipes/team-short.pipe';

@NgModule({
  declarations: [TrimDirective, HeightPipe, TeamShortPipe],
  imports: [CommonModule],
  exports: [TrimDirective, HeightPipe, TeamShortPipe]
})
export class SharedModule { }