import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
import { feetInchesToInches, inchesToFeetInches } from 'src/app/common/formatters/height-formatter';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { FIFRosterDto } from '../../services/fif';
import { FifService } from '../../services/fif.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: []
})
export class RosterComponent implements OnInit {
  fifForm!: FormGroup;
  roster: FIFRosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = '';
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;

  constructor(private fifService: FifService) { }

  private normalizeOptionalNumber(value: any): number | null {
    if (value === null || value === undefined || String(value).trim() === '') {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.fifForm = new FormGroup({
      team: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      lastName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      position: new FormControl('', [Validators.required, nonEmptyStringValidator()]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      draftYear: new FormControl('', [yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      seasonYear: new FormControl(currentYear, [Validators.required, yearRangeValidator(1900, currentYear + 1), Validators.pattern('^[0-9]{4}$')]),
      height: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+\'?[0-9]{1,2}"$')]),
      weight: new FormControl(null, [Validators.required, Validators.min(98), Validators.max(500), Validators.pattern('^[0-9]+$')]),
      dateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthCityState: new FormControl('', [noXssValidator()]),
      college: new FormControl('', [noXssValidator()]),
      playerId: new FormControl({ value: '', disabled: true }),
      totalGoals: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      assists: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      saves: new FormControl('', [Validators.pattern('^[0-9]+$')])
    });

    this.loadRoster();
  }

  resetAction() {
    this.errMessage = '';
    this.isAdding = false;
    this.isSubmitted = false;
    this.fifForm.reset();
    this.fifForm.markAsUntouched();
  }

  loadRoster() {
    this.isLoading = true;
    this.fifService.GetRoster().subscribe({
      next: data => {
        this.roster = (data || []).map((item: any) => {
          const rawDob = item?.dateOfBirth ?? item?.DateOfBirth ?? null;
          return {
            ...item,
            teamCode: item?.teamCode ?? item?.TeamCode ?? item?.team ?? item?.Team ?? '',
            dateOfBirth: this.toIsoDateOrNull(rawDob)
          };
        });
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching FIF roster data from the service!', error);
        this.isLoading = false;
      }
    });
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.fifForm.patchValue({ seasonYear: new Date().getFullYear() });
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row };
    this.setFormValues(row);
    this.display = true;
  }

  save() {
    this.isSubmitted = true;
    if (this.fifForm.valid) {
      this.refreshSelectedRow();

      const playerToSave: FIFRosterDto = {
        playerId: this.selectedRow.playerId,
        teamCode: (this.selectedRow.team || this.selectedRow.teamCode || '').toString().trim().toUpperCase(),
        team: (this.selectedRow.team || this.selectedRow.teamCode || '').toString().trim().toUpperCase(),
        firstName: this.selectedRow.firstName || '',
        lastName: this.selectedRow.lastName || '',
        position: this.selectedRow.position || '',
        number: this.selectedRow.number || '',
        draftYear: this.normalizeOptionalNumber(this.selectedRow.draftYear),
        seasonYear: this.normalizeOptionalNumber(this.selectedRow.seasonYear),
        height: feetInchesToInches(this.selectedRow.height || ''),
        weight: this.selectedRow.weight || '',
        dateOfBirth: this.selectedRow.dateOfBirth ? new Date(this.selectedRow.dateOfBirth) : null,
        birthCountry: this.selectedRow.birthCountry || '',
        birthCityState: this.selectedRow.birthCityState || '',
        college: this.selectedRow.college || '',
        totalGoals: this.normalizeOptionalNumber(this.selectedRow.totalGoals),
        assists: this.normalizeOptionalNumber(this.selectedRow.assists),
        saves: this.normalizeOptionalNumber(this.selectedRow.saves)
      };

      this.fifService.SaveRoster(playerToSave).subscribe({
        next: data => {
          console.log('Player updated successfully', data);
          this.errMessage = 'Player updated successfully!';

          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster();
              this.display = false;
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error saving the player!', error);
          this.errMessage = 'There was an error saving the player. Please try again.';
          this.display = true;
        }
      });
    }
  }

  add() {
    this.isSubmitted = true;
    if (this.fifForm.valid) {
      const playerToAdd: FIFRosterDto = {
        playerId: -1,
        teamCode: (this.fifForm.get('team')?.value || '').toString().trim().toUpperCase(),
        team: (this.fifForm.get('team')?.value || '').toString().trim().toUpperCase(),
        firstName: this.fifForm.get('firstName')?.value || '',
        lastName: this.fifForm.get('lastName')?.value || '',
        position: this.fifForm.get('position')?.value || '',
        number: this.fifForm.get('number')?.value || '',
        draftYear: this.normalizeOptionalNumber(this.fifForm.get('draftYear')?.value),
        seasonYear: this.normalizeOptionalNumber(this.fifForm.get('seasonYear')?.value),
        height: feetInchesToInches(this.fifForm.get('height')?.value || ''),
        weight: this.fifForm.get('weight')?.value || '',
        dateOfBirth: this.fifForm.get('dateOfBirth')?.value ? new Date(this.fifForm.get('dateOfBirth')?.value) : null,
        birthCountry: this.fifForm.get('birthCountry')?.value || '',
        birthCityState: this.fifForm.get('birthCityState')?.value || '',
        college: this.fifForm.get('college')?.value || '',
        totalGoals: this.normalizeOptionalNumber(this.fifForm.get('totalGoals')?.value),
        assists: this.normalizeOptionalNumber(this.fifForm.get('assists')?.value),
        saves: this.normalizeOptionalNumber(this.fifForm.get('saves')?.value)
      };

      this.fifService.AddRoster(playerToAdd).subscribe({
        next: data => {
          console.log('Player added successfully', data);
          this.errMessage = 'Player added successfully!';

          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster();
              this.display = false;
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error adding the player!', error);
          this.errMessage = 'There was an error adding the player. Please try again.';
          this.display = true;
        }
      });
    }
  }

  deleteRow(playerId: string) {
    if (!playerId) {
      console.error('No player selected to delete!');
      this.errMessage = 'No player selected to delete!';
      this.display = true;
      return;
    }

    this.fifService.DeleteRoster(playerId).subscribe({
      next: data => {
        console.log('Player deleted successfully', data);
        this.display = false;
        this.loadRoster();
      },
      error: error => {
        console.error('There was an error deleting the player!', error);
        this.errMessage = 'There was an error deleting the player. Please try again.';
        this.display = true;
      }
    });
  }

  hideDialog() {
    this.display = false;
    this.resetAction();
  }

  setFormValues(row: any) {
    const rawDob = row?.dateOfBirth ?? row?.DateOfBirth ?? null;

    this.fifForm.setValue({
      team: row.teamCode || row.team || '',
      league: row.league || '',
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      position: row.position || '',
      number: row.number || '',
      draftYear: row.draftYear || '',
      seasonYear: row.seasonYear || '',
      height: inchesToFeetInches(row.height || ''),
      weight: row.weight || '',
      dateOfBirth: this.toDateInputString(rawDob),
      birthCountry: row.birthCountry || '',
      birthCityState: row.birthCityState || '',
      college: row.college || '',
      playerId: row.playerId || '',
      totalGoals: row.totalGoals || '',
      assists: row.assists || '',
      saves: row.saves || ''
    });
  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.fifForm.value,
      playerId: this.selectedRow.playerId
    };
  }

  private toIsoDateOrNull(value: any): string | null {
    if (!value) {
      return null;
    }

    const asDate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(asDate.getTime())) {
      return null;
    }

    return asDate.toISOString();
  }

  private toDateInputString(value: any): string {
    if (!value) {
      return '';
    }

    const asDate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(asDate.getTime())) {
      return '';
    }

    return formatDateMMDDYYYY(asDate);
  }
}
