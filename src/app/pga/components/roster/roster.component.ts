import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
import { feetInchesToInches, inchesToFeetInches } from 'src/app/common/formatters/height-formatter';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { PGARosterDto } from '../../services/pga';
import { PgaService } from '../../services/pga.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: []
})
export class RosterComponent implements OnInit {
  pgaForm!: FormGroup;
  roster: PGARosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = '';
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;

  constructor(private pgaService: PgaService) { }

  private normalizeOptionalNumber(value: any): number | null {
    if (value === null || value === undefined || String(value).trim() === '') {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.pgaForm = new FormGroup({
      team: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      lastName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      position: new FormControl('', [Validators.required, nonEmptyStringValidator()]),
      number: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      draftYear: new FormControl('', [yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      seasonYear: new FormControl(currentYear, [Validators.required, yearRangeValidator(1900, currentYear + 1), Validators.pattern('^[0-9]{4}$')]),
      height: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+\'?[0-9]{1,2}"$')]),
      weight: new FormControl(null, [Validators.required, Validators.min(98), Validators.max(500), Validators.pattern('^[0-9]+$')]),
      dateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthCityState: new FormControl('', [noXssValidator()]),
      college: new FormControl('', [noXssValidator()]),
      playerId: new FormControl({ value: '', disabled: true }),
      wins: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      majors: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      drivingDistance: new FormControl('', [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      scoringAverage: new FormControl('', [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      eventsPlayed: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      cutsMade: new FormControl('', [Validators.pattern('^[0-9]+$')])
    });

    this.loadRoster();
  }

  resetAction() {
    this.errMessage = '';
    this.isAdding = false;
    this.isSubmitted = false;
    this.pgaForm.reset();
    this.pgaForm.markAsUntouched();
  }

  loadRoster() {
    this.isLoading = true;
    this.pgaService.GetRoster().subscribe({
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
        console.error('There was an error fetching PGA roster data from the service!', error);
        this.isLoading = false;
      }
    });
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.pgaForm.patchValue({ seasonYear: new Date().getFullYear() });
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
    if (this.pgaForm.valid) {
      this.refreshSelectedRow();

      const playerToSave: PGARosterDto = {
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
        wins: this.normalizeOptionalNumber(this.selectedRow.wins),
        majors: this.normalizeOptionalNumber(this.selectedRow.majors),
        drivingDistance: this.normalizeOptionalNumber(this.selectedRow.drivingDistance),
        scoringAverage: this.normalizeOptionalNumber(this.selectedRow.scoringAverage),
        eventsPlayed: this.normalizeOptionalNumber(this.selectedRow.eventsPlayed),
        cutsMade: this.normalizeOptionalNumber(this.selectedRow.cutsMade)
      };

      this.pgaService.SaveRoster(playerToSave).subscribe({
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
    if (this.pgaForm.valid) {
      const playerToAdd: PGARosterDto = {
        playerId: -1,
        teamCode: (this.pgaForm.get('team')?.value || '').toString().trim().toUpperCase(),
        team: (this.pgaForm.get('team')?.value || '').toString().trim().toUpperCase(),
        firstName: this.pgaForm.get('firstName')?.value || '',
        lastName: this.pgaForm.get('lastName')?.value || '',
        position: this.pgaForm.get('position')?.value || '',
        number: this.pgaForm.get('number')?.value || '',
        draftYear: this.normalizeOptionalNumber(this.pgaForm.get('draftYear')?.value),
        seasonYear: this.normalizeOptionalNumber(this.pgaForm.get('seasonYear')?.value),
        height: feetInchesToInches(this.pgaForm.get('height')?.value || ''),
        weight: this.pgaForm.get('weight')?.value || '',
        dateOfBirth: this.pgaForm.get('dateOfBirth')?.value ? new Date(this.pgaForm.get('dateOfBirth')?.value) : null,
        birthCountry: this.pgaForm.get('birthCountry')?.value || '',
        birthCityState: this.pgaForm.get('birthCityState')?.value || '',
        college: this.pgaForm.get('college')?.value || '',
        wins: this.normalizeOptionalNumber(this.pgaForm.get('wins')?.value),
        majors: this.normalizeOptionalNumber(this.pgaForm.get('majors')?.value),
        drivingDistance: this.normalizeOptionalNumber(this.pgaForm.get('drivingDistance')?.value),
        scoringAverage: this.normalizeOptionalNumber(this.pgaForm.get('scoringAverage')?.value),
        eventsPlayed: this.normalizeOptionalNumber(this.pgaForm.get('eventsPlayed')?.value),
        cutsMade: this.normalizeOptionalNumber(this.pgaForm.get('cutsMade')?.value)
      };

      this.pgaService.AddRoster(playerToAdd).subscribe({
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

    this.pgaService.DeleteRoster(playerId).subscribe({
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

    this.pgaForm.setValue({
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
      wins: row.wins ?? '',
      majors: row.majors ?? '',
      drivingDistance: row.drivingDistance ?? '',
      scoringAverage: row.scoringAverage ?? '',
      eventsPlayed: row.eventsPlayed ?? '',
      cutsMade: row.cutsMade ?? ''
    });
  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.pgaForm.value,
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
