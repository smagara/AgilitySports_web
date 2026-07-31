import { Component, EventEmitter, Input, Output } from '@angular/core';

type RosterFilterDraft = {
  playerId: string;
  team: string;
  firstName: string;
  lastName: string;
};

@Component({
  selector: 'app-roster-filter-dialog',
  templateUrl: './roster-filter-dialog.component.html'
})
export class RosterFilterDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() teamOptions: string[] = [];
  @Input() idPrefix: string = 'roster';
  @Input() filterDraft: RosterFilterDraft = this.createEmptyFilterDraft();

  @Output() apply = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  private createEmptyFilterDraft(): RosterFilterDraft {
    return {
      playerId: '',
      team: '',
      firstName: '',
      lastName: ''
    };
  }
}
