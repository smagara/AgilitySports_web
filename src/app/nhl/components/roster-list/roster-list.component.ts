import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NHLRosterDto } from '../../services/nhl';

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit {
  @Input() roster: NHLRosterDto[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<NHLRosterDto>();
  @Output() deleteRow = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: NHLRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerID: number) {
    this.deleteRow.emit(playerID);
  }
}
