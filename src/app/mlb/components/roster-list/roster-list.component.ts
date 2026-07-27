import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MLBRosterDto } from '../../services/mlb';

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit {
  @Input() roster: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<MLBRosterDto>();
  @Output() deleteRow = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: MLBRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerId: number) {
    this.deleteRow.emit(playerId);
  }

  computeAge(dateOfBirth?: Date | string | null): number | '' {
    if (!dateOfBirth) {
      return '';
    }

    const dob = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
    if (Number.isNaN(dob.getTime())) {
      return '';
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }
}
