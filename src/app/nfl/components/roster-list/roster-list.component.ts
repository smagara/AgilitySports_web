import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NFLRosterDto } from '../../services/nfl';

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit {
  @Input() roster: NFLRosterDto[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<NFLRosterDto>();
  @Output() deleteRow = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: NFLRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerID: number) {
    this.deleteRow.emit(playerID);
  }
}
