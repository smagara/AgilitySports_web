import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { feetInchesToInches, inchesToFeetInches } from 'src/app/common/formatters/height-formatter';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { MLBRosterDto } from '../../services/mlb';
import { MlbService } from '../../services/mlb.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  mlbForm!: FormGroup;
  roster: MLBRosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = '';
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;

  constructor (private mlbService: MlbService) {}

  ngOnInit(): void {
    this.mlbForm = new FormGroup({
      teamCode: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      lastName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      position: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+'[0-9]{1,2}\"$")]),
      weight: new FormControl('', [Validators.required, Validators.min(98), Validators.max(500), Validators.pattern('^[0-9]{2,3}$')]),
      bats: new FormControl('', [Validators.required, Validators.pattern('^[LRBS]$')]),
      throws: new FormControl('', [Validators.required, Validators.pattern('^[RL]$')]),
      dateOfBirth: new FormControl('', [Validators.required, yearRangeValidator(1900, new Date().getFullYear()), Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthPlace: new FormControl('', [noXssValidator()]),
      playerID: new FormControl({ value: '', disabled: true })
    });

    this.loadRoster();
  }

  loadRoster() {
    this.isLoading = true;
    this.mlbService.GetRoster().subscribe({
      next: data => {
        this.roster = data.map((row) => ({
          ...row,
          league: row.league || ''
        }));
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching Baseball data from the service!', error);
        this.isLoading = false;
      }
    });
  }

  resetAction() {
    this.errMessage = '';
    this.isAdding = false;
    this.isSubmitted = false;
    this.mlbForm.reset();
    this.mlbForm.markAsUntouched();
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.display = true;
  }

  editRow(row: MLBRosterDto) {
    this.resetAction();
    this.selectedRow = { ...row };
    this.setFormValues(row);
    this.display = true;
  }

  deleteRow(playerID: string) {
    if (!playerID) {
      this.errMessage = 'No player selected to delete!';
      this.display = true;
      return;
    }

    this.mlbService.DeleteRoster(playerID).subscribe({
      next: () => {
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

  save() {
    this.isSubmitted = true;
    if (this.mlbForm.valid) {
      this.refreshSelectedRow();

      const playerToSave = this.buildRosterPayload(this.selectedRow, this.selectedRow.playerID);

      this.mlbService.SaveRoster(playerToSave).subscribe({
        next: () => {
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
    if (this.mlbForm.valid) {
      const playerToAdd = this.buildRosterPayload(this.mlbForm.value, '-1');

      this.mlbService.AddRoster(playerToAdd).subscribe({
        next: () => {
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

  hideDialog() {
    this.display = false;
    this.resetAction();
  }

  setFormValues(row: MLBRosterDto) {
    this.mlbForm.setValue({
      teamCode: row.teamCode || '',
      league: row.league || '',
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      position: row.position || '',
      number: row.number || '',
      height: inchesToFeetInches(row.height || ''),
      weight: row.weight || '',
      bats: this.normalizeBatsForForm(row.bats),
      throws: this.normalizeThrowsForForm(row.throws),
      dateOfBirth: row.dateOfBirth ? formatDateMMDDYYYY(new Date(row.dateOfBirth)) : '',
      birthCountry: row.birthCountry || '',
      birthPlace: row.birthPlace || '',
      playerID: row.playerID || ''
    });
  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.mlbForm.value,
      playerID: this.selectedRow.playerID
    };
  }

  private buildRosterPayload(source: any, playerID: string): MLBRosterDto {
    return {
      playerID: playerID || '-1',
      teamCode: String(source.teamCode || '').trim().toUpperCase(),
      teamName: source.teamName || this.lookupTeamShortName(String(source.teamCode || '').trim().toUpperCase()),
      firstName: source.firstName || '',
      lastName: source.lastName || '',
      league: String(source.league || ''),
      position: source.position || '',
      number: String(source.number ?? ''),
      height: feetInchesToInches(source.height || ''),
      weight: String(source.weight ?? ''),
      bats: this.normalizeBatsForPayload(source.bats),
      throws: this.normalizeThrowsForPayload(source.throws),
      dateOfBirth: source.dateOfBirth ? new Date(source.dateOfBirth) : null,
      birthCountry: source.birthCountry || '',
      birthPlace: source.birthPlace || ''
    };
  }

  private normalizeBatsForForm(value: any): string {
    const code = String(value || '').trim().toUpperCase();
    return code === 'S' ? 'B' : code;
  }

  private normalizeThrowsForForm(value: any): string {
    return String(value || '').trim().toUpperCase();
  }

  private normalizeBatsForPayload(value: any): string {
    const code = String(value || '').trim().toUpperCase();
    return code === 'B' ? 'S' : code;
  }

  private normalizeThrowsForPayload(value: any): string {
    return String(value || '').trim().toUpperCase();
  }

  private lookupTeamShortName(teamCode: string): string {
    const match = this.roster.find((r) => String(r.teamCode || '').toUpperCase() === teamCode.toUpperCase());
    return match?.teamName || '';
  }
}
