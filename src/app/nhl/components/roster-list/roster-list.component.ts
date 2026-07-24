import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NHLRosterDto } from '../../services/nhl';

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit {
  @Input() roster: any[] = [];
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

  getFirstName(row: any): string {
    const firstName = String(row?.firstName || '').trim();
    if (firstName) {
      return firstName;
    }

    const name = String(row?.name || '').trim();
    if (!name) {
      return '';
    }

    return name.split(/\s+/)[0] || '';
  }

  getLastName(row: any): string {
    const lastName = String(row?.lastName || '').trim();
    if (lastName) {
      return lastName;
    }

    const name = String(row?.name || '').trim();
    if (!name) {
      return '';
    }

    const parts = name.split(/\s+/);
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
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
