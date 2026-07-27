import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MLBRosterDto } from '../../services/mlb';

type RosterFilter = {
  playerId: string;
  team: string;
  firstName: string;
  lastName: string;
};

@Component({
  selector: 'sports-roster-list',
  templateUrl: './roster-list.component.html',
})
export class RosterListComponent implements OnInit, OnChanges {
  @Input() roster: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<MLBRosterDto>();
  @Output() deleteRow = new EventEmitter<number>();

  filteredRoster: any[] = [];
  filterDialogVisible: boolean = false;
  teamOptions: string[] = [];
  filterDraft: RosterFilter = this.createEmptyFilter();
  activeFilter: RosterFilter = this.createEmptyFilter();

  constructor() { }

  ngOnInit(): void {
    this.syncFilterState();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.syncFilterState();
  }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: MLBRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerId: number) {
    this.deleteRow.emit(playerId);
  }

  onFilterRow() {
    this.filterDraft = { ...this.activeFilter };
    this.filterDialogVisible = true;
  }

  applyFilter() {
    this.activeFilter = this.normalizeFilter(this.filterDraft);
    this.filterDialogVisible = false;
    this.applyFilters();
  }

  clearFilterDraft() {
    this.filterDraft = this.createEmptyFilter();
  }

  resetAllFilters() {
    this.activeFilter = this.createEmptyFilter();
    this.filterDraft = this.createEmptyFilter();
    this.filterDialogVisible = false;
    this.applyFilters();
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

  private syncFilterState() {
    this.teamOptions = this.buildTeamOptions(this.roster);
    this.applyFilters();
  }

  private applyFilters() {
    const filter = this.normalizeFilter(this.activeFilter);
    this.filteredRoster = (this.roster || []).filter((row) => {
      const playerId = String(row?.playerId ?? '').trim().toUpperCase();
      const team = this.getTeamValue(row).toUpperCase();
      const firstName = String(row?.firstName ?? '').trim().toUpperCase();
      const lastName = String(row?.lastName ?? '').trim().toUpperCase();

      const playerMatch = !filter.playerId || playerId === filter.playerId;
      const teamMatch = !filter.team || team === filter.team;
      const firstMatch = !filter.firstName || firstName.startsWith(filter.firstName);
      const lastMatch = !filter.lastName || lastName.startsWith(filter.lastName);

      return playerMatch && teamMatch && firstMatch && lastMatch;
    });
  }

  private buildTeamOptions(rows: any[]): string[] {
    const values = (rows || []).map((row) => this.getTeamValue(row)).filter((team) => !!team);
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }

  private getTeamValue(row: any): string {
    return String(row?.team || row?.teamName || row?.teamCode || '').trim();
  }

  private normalizeFilter(filter: RosterFilter): RosterFilter {
    return {
      playerId: String(filter.playerId || '').trim().toUpperCase(),
      team: String(filter.team || '').trim().toUpperCase(),
      firstName: String(filter.firstName || '').trim().toUpperCase(),
      lastName: String(filter.lastName || '').trim().toUpperCase(),
    };
  }

  private createEmptyFilter(): RosterFilter {
    return {
      playerId: '',
      team: '',
      firstName: '',
      lastName: ''
    };
  }
}
