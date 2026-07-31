import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FIFRosterDto } from '../../services/fif';

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
  @Input() roster: FIFRosterDto[] = [];
  @Input() isLoading: boolean = false;
  @Output() addRow = new EventEmitter<void>();
  @Output() editRow = new EventEmitter<FIFRosterDto>();
  @Output() deleteRow = new EventEmitter<string | number>();

  filteredRoster: FIFRosterDto[] = [];
  filterDialogVisible: boolean = false;
  teamOptions: string[] = [];
  filterDraft: RosterFilter = this.createEmptyFilter();
  activeFilter: RosterFilter = this.createEmptyFilter();

  ngOnInit(): void {
    this.syncFilterState();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.syncFilterState();
  }

  onAddRow() {
    this.addRow.emit();
  }

  onEditRow(row: FIFRosterDto) {
    this.editRow.emit(row);
  }

  onDeleteRow(playerId: string | number) {
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
    const normalizedTeam = String(filter.team || '').trim().toUpperCase();
    this.filteredRoster = (this.roster || []).filter((row) => {
      const playerId = String((row as any)?.playerId ?? '').trim().toUpperCase();
      const team = this.getTeamValue(row).toUpperCase();
      const firstName = String((row as any)?.firstName ?? '').trim().toUpperCase();
      const lastName = String((row as any)?.lastName ?? '').trim().toUpperCase();

      const playerMatch = !filter.playerId || playerId === filter.playerId;
      const teamMatch = !normalizedTeam || team === normalizedTeam;
      const firstMatch = !filter.firstName || firstName.startsWith(filter.firstName);
      const lastMatch = !filter.lastName || lastName.startsWith(filter.lastName);

      return playerMatch && teamMatch && firstMatch && lastMatch;
    });
  }

  private buildTeamOptions(rows: FIFRosterDto[]): string[] {
    const values = (rows || []).map((row) => this.getTeamValue(row)).filter((team) => !!team);
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }

  private getTeamValue(row: FIFRosterDto): string {
    return String((row as any)?.teamName || (row as any)?.team || (row as any)?.teamCode || '').trim();
  }

  private normalizeFilter(filter: RosterFilter): RosterFilter {
    return {
      playerId: String(filter.playerId || '').trim().toUpperCase(),
      team: String(filter.team || '').trim(),
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
