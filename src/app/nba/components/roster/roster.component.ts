import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
import { feetInchesToInches, inchesToFeetInches } from 'src/app/common/formatters/height-formatter';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { NBARosterDto } from '../../services/nba';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  nbaForm!: FormGroup;
  roster: NBARosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = "";
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;

  constructor(private nbaService: NbaService) { }

  private normalizeOptionalNumber(value: any): number | null {
    if (value === null || value === undefined || String(value).trim() === '') {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private normalizeNbaPositionCode(value: any): string {
    const raw = String(value || '').trim();
    if (!raw) {
      return '';
    }

    const upper = raw.toUpperCase();
    const validCodes = new Set(['C', 'F', 'G', 'PF', 'PG', 'SF', 'SG']);
    if (validCodes.has(upper)) {
      return upper;
    }

    const byLabel: Record<string, string> = {
      'CENTER': 'C',
      'FORWARD': 'F',
      'GUARD': 'G',
      'POWER FORWARD': 'PF',
      'POINT GUARD': 'PG',
      'SMALL FORWARD': 'SF',
      'SHOOTING GUARD': 'SG'
    };

    return byLabel[upper] || upper;
  }

  private buildApiErrorMessage(error: any, fallback: string): string {
    const details = error?.error?.details;
    if (Array.isArray(details) && details.length > 0) {
      return details.join(' ');
    }

    const message = error?.error?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }

    return fallback;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.nbaForm = new FormGroup({
      team: new FormControl('', [noXssValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('', [noXssValidator()]),
      lastName: new FormControl('', [noXssValidator()]),
      position: new FormControl('', [Validators.required,
        nonEmptyStringValidator()]),
      number: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]+$')]), // numbers only
      height: new FormControl(null, [Validators.required,
        Validators.pattern('^[0-9]+\'[0-9]{1,2}"$')]), // feet and inches (e.g. 6'9")
      weight: new FormControl(null, [Validators.required,
        Validators.min(98),
        Validators.max(500),
        Validators.pattern('^[0-9]+$')]),
      draftYear: new FormControl(null, [Validators.required, yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      seasonYear: new FormControl(currentYear, [Validators.required, yearRangeValidator(1900, currentYear + 1), Validators.pattern('^[0-9]{4}$')]),
      dateOfBirth: new FormControl(null,
        [Validators.required,
          yearRangeValidator(1900, new Date().getFullYear()), // Use the custom validator
          Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]
      ),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthCityState: new FormControl('', [noXssValidator()]),
      college: new FormControl('', [noXssValidator()]),
      playerId: new FormControl({ value: '', disabled: true }),
      pointsPerGame: new FormControl('', [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]), // numbers/decimals
      reboundsPerGame: new FormControl('', [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]), // numbers/decimals
      assistsPerGame: new FormControl('', [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]), // numbers/decimals
       
    });
    this.loadRoster();
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
    this.isSubmitted = false;
    this.nbaForm.reset();
    this.nbaForm.markAsUntouched();
  }

  loadRoster() {
    this.isLoading = true;
    this.nbaService.GetRoster().subscribe({
      next: data => {
        this.roster = (data || []).map((item: any) => ({
          ...item,
          teamCode: item?.teamCode ?? item?.TeamCode ?? item?.team ?? item?.Team ?? ''
        }));
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NBA roster data from the service!', error);
        this.isLoading = false;
      }
    });
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.nbaForm.patchValue({ seasonYear: new Date().getFullYear() });
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row }; // Create a copy of the row to edit
    this.setFormValues(row);
    this.display = true;
  }

  deleteRow(playerId: string) {
    this.resetAction();
    this.display = false;
    this.delete(playerId);
  }

  save() {
    this.isSubmitted = true;
    if (this.nbaForm.valid) {
      // Update the selectedRow with the form values
      this.refreshSelectedRow();

      const playerToSave: NBARosterDto = {
        playerId: this.selectedRow.playerId,
        teamCode: (this.selectedRow.team || this.selectedRow.teamCode || '').toString().trim().toUpperCase(),
        team: (this.selectedRow.team || this.selectedRow.teamCode || '').toString().trim().toUpperCase(),
        teamName: this.selectedRow.teamName || '',
        firstName: this.selectedRow.firstName || '',
        lastName: this.selectedRow.lastName || '',
        league: this.selectedRow.league || '',
        position: this.normalizeNbaPositionCode(this.selectedRow.position),
        number: this.selectedRow.number || '',
        height: feetInchesToInches(this.selectedRow.height || ''),
        weight: this.selectedRow.weight || '',
        dateOfBirth: this.selectedRow.dateOfBirth ? new Date(this.selectedRow.dateOfBirth) : null,
        birthCountry: this.selectedRow.birthCountry || '',
        birthCityState: this.selectedRow.birthCityState || '',
        college: this.selectedRow.college || '',
        draftYear: this.normalizeOptionalNumber(this.selectedRow.draftYear),
        seasonYear: this.normalizeOptionalNumber(this.selectedRow.seasonYear),
        pointsPerGame: this.normalizeOptionalNumber(this.selectedRow.pointsPerGame),
        reboundsPerGame: this.normalizeOptionalNumber(this.selectedRow.reboundsPerGame),
        assistsPerGame: this.normalizeOptionalNumber(this.selectedRow.assistsPerGame)
      };

      this.nbaService.SaveRoster(playerToSave).subscribe({
        next: data => {
          console.log('Player updated successfully', data);
          this.errMessage = "Player updated successfully!";

          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster(); // reload the grid
              this.display = false;
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error saving the player!', error);
          this.errMessage = this.buildApiErrorMessage(error, 'There was an error saving the player. Please try again.');
          this.display = true;
        }
      });
    }
  }

  add() {
    this.isSubmitted = true;
    if (this.nbaForm.valid) {

      const playerToAdd: NBARosterDto = {
        playerId: -1, // Adds will generate a new ID
        teamCode: (this.nbaForm.get('team')?.value || '').toString().trim().toUpperCase(),
        team: (this.nbaForm.get('team')?.value || '').toString().trim().toUpperCase(),
        firstName: this.nbaForm.get('firstName')?.value || '',
        lastName: this.nbaForm.get('lastName')?.value || '',
        league: this.nbaForm.get('league')?.value || '',
        position: this.normalizeNbaPositionCode(this.nbaForm.get('position')?.value),
        number: this.nbaForm.get('number')?.value || '',
        draftYear: this.normalizeOptionalNumber(this.nbaForm.get('draftYear')?.value),
        seasonYear: this.normalizeOptionalNumber(this.nbaForm.get('seasonYear')?.value),
        height: feetInchesToInches(this.nbaForm.get('height')?.value || ''),
        weight: this.nbaForm.get('weight')?.value || '',
        dateOfBirth: this.nbaForm.get('dateOfBirth')?.value ? new Date(this.nbaForm.get('dateOfBirth')?.value) : null,
        birthCountry: this.nbaForm.get('birthCountry')?.value || '',
        birthCityState: this.nbaForm.get('birthCityState')?.value || '',
        college: this.nbaForm.get('college')?.value || '',
        pointsPerGame: this.normalizeOptionalNumber(this.nbaForm.get('pointsPerGame')?.value),
        reboundsPerGame: this.normalizeOptionalNumber(this.nbaForm.get('reboundsPerGame')?.value),
        assistsPerGame: this.normalizeOptionalNumber(this.nbaForm.get('assistsPerGame')?.value),
      };

      this.nbaService.AddRoster(playerToAdd).subscribe({
        next: data => {

          console.log('Player added successfully', data);
          this.errMessage = "Player added successfully!";

          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster(); // reload the grid
              this.display = false;
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error adding the player!', error);
          this.errMessage = this.buildApiErrorMessage(error, 'There was an error adding the player. Please try again.');
          this.display = true;
        }
      });
    }
  }

  delete(playerId: string) {
    if (!playerId) {
      console.error('No player selected to delete!');
      this.errMessage = "No player selected to delete!";
      this.display = true;
      return;
    }
    this.nbaService.DeleteRoster(playerId).subscribe({
      next: data => {
        console.log('Player deleted successfully', data);
        this.display = false;
        this.loadRoster();
      },
      error: error => {
        console.error('There was an error deleting the player!', error);
        this.errMessage = "There was an error deleting the player. Please try again.";
        this.display = true;
      }
    })
  }

  hideDialog() {
    this.display = false;
    this.resetAction(); // Reset form state when dialog is closed
  }

  onDialogHide() {
    this.selectedRow = {}
    this.resetAction(); // Reset form state when dialog is hidden
  };

  setFormValues(row: any) {

    this.nbaForm.setValue({
      team: row.teamCode || row.team || '',
      league: row.league || '',
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      position: this.normalizeNbaPositionCode(row.position || ''),
      number: row.number || '',
      draftYear: row.draftYear || '',
      seasonYear: row.seasonYear || '',
      height: inchesToFeetInches(row.height || ''),
      weight: row.weight || '',
      dateOfBirth: row.dateOfBirth ? formatDateMMDDYYYY(new Date(row.dateOfBirth)) : '',
      birthCountry: row.birthCountry || '',
      birthCityState: row.birthCityState || '',
      college: row.college || '',
      playerId: row.playerId || '',
      pointsPerGame: row.pointsPerGame ?? '',
      reboundsPerGame: row.reboundsPerGame ?? '',
      assistsPerGame: row.assistsPerGame ?? ''
    });

  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.selectedRow,
      ...this.nbaForm.value,
      playerId: this.selectedRow.playerId
    };
  }
}
