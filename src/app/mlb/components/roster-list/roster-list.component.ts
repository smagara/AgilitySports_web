import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MLBRosterDto } from '../../services/mlb';

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit {
  @Input() roster: MLBRosterDto[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<MLBRosterDto>();
  @Output() deleteRow = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: MLBRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerID: string) {
    this.deleteRow.emit(playerID);
  }
}
