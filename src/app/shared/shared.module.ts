import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TrimDirective } from '../common/directives/trim.directive';
import { HeightPipe } from '../common/pipes/height.pipe';
import { TeamShortPipe } from '../common/pipes/team-short.pipe';
import { RosterFilterDialogComponent } from './components/roster-filter-dialog/roster-filter-dialog.component';

@NgModule({
  declarations: [TrimDirective, HeightPipe, TeamShortPipe, RosterFilterDialogComponent],
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule],
  exports: [TrimDirective, HeightPipe, TeamShortPipe, RosterFilterDialogComponent, ButtonModule]
})
export class SharedModule { }