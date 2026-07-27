import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
import { feetInchesToInches, inchesToFeetInches } from 'src/app/common/formatters/height-formatter';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { NHLRosterDto } from '../../services/nhl';
import { NhlService } from '../../services/nhl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  nhlForm!: FormGroup;
  roster: NHLRosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = "";
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;
  constructor(private nhlService: NhlService) { }

  private normalizeOptionalNumber(value: any): number | undefined {
    if (value === null || value === undefined || String(value).trim() === '') {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.nhlForm = new FormGroup({
      team: new FormControl('', [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('',  [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      lastName: new FormControl('',  [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      position: new FormControl('', [Validators.required /*, nonEmptyStringValidator() not needed */]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // numbers only
      height: new FormControl(null, [Validators.required,
        Validators.pattern('^[0-9]+\'[0-9]{1,2}"$')]), // feet and inches (e.g. 6'9")
      weight: new FormControl(null, [Validators.required,
        Validators.min(98),
        Validators.max(500),
        Validators.pattern('^[0-9]+$')]),
      draftYear: new FormControl(null, [Validators.required, yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      seasonYear: new FormControl(currentYear, [Validators.required, yearRangeValidator(1900, currentYear + 1), Validators.pattern('^[0-9]{4}$')]),
      dateOfBirth: new FormControl('', [Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthCityState: new FormControl('', [noXssValidator()]),
      college: new FormControl('', [noXssValidator()]),
      playerId: new FormControl({ value: '', disabled: true }),
      handed: new FormControl(null),
      goals: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      penaltyMinutes: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      points: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      savePct: new FormControl('', [Validators.min(0.0), Validators.max(0.999), Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]), // numbers/decimals
    });

    this.loadRoster();
  }

  loadRoster() {
    this.resetAction();
    this.isLoading = true;
    this.nhlService.GetRoster().subscribe({
      next: data => {
        this.roster = (data || []).map((item: any) => ({
          ...item,
          birthCityState: item?.birthCityState ?? item?.BirthCityState ?? ''
        }));
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NHL roster data from the service!', error);
        this.isLoading = false;
      }
    });
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.nhlForm.patchValue({ seasonYear: new Date().getFullYear() });
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row }; // Create a copy of the row to edit
    this.setFormValues(row);
    this.display = true;
  }

  deleteRow(playerId: string) {
    if (!playerId) {
      console.error('No player selected to delete!');
      this.errMessage = "No player selected to delete!";
      this.display = true;
      return;
    }
    this.nhlService.DeleteRoster(playerId).subscribe({
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
  }

  setFormValues(row: any) {
    const [firstNameFromName, ...lastNameParts] = String(row.name || '').trim().split(/\s+/).filter((x: string) => !!x);

    this.nhlForm.setValue({
      team: row.teamCode || row.team || '',
      league: row.league || '',
      firstName: row.firstName || firstNameFromName || '',
      lastName: row.lastName || lastNameParts.join(' ') || '',
      position: row.position || '',
      number: row.number || '',
      draftYear: row.draftYear || '',
      seasonYear: row.seasonYear || '',
      height: inchesToFeetInches(row.height || ''),
      weight: row.weight || '',
      dateOfBirth: row.dateOfBirth ? formatDateMMDDYYYY(new Date(row.dateOfBirth)) : '',
      birthCountry: row.birthCountry || '',
      birthCityState: row.birthCityState || row.BirthCityState || '',
      college: row.college || '',
      playerId: row.playerId || '',
      handed: row.handed || '',
      goals: row.goals || '',
      penaltyMinutes: row.penaltyMinutes,
      points: row.points,
      savePct: row.savePct
    });
  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.nhlForm.value, // Get all the current form values
      playerId: this.selectedRow.playerId
    };
  }

  save() {
    this.isSubmitted = true;
    if (this.nhlForm.valid) {
      this.refreshSelectedRow();

      const playerToSave = {
        playerId: this.selectedRow.playerId,
        team: this.selectedRow.team,
        league: this.selectedRow.league,
        name: [this.selectedRow.firstName, this.selectedRow.lastName].filter((x: string) => !!x).join(' ').trim(),
        position: this.selectedRow.position,
        number: this.selectedRow.number,
        draftYear: this.normalizeOptionalNumber(this.selectedRow.draftYear),
        seasonYear: this.normalizeOptionalNumber(this.selectedRow.seasonYear),
        height: feetInchesToInches(this.selectedRow.height || ''),
        weight: this.selectedRow.weight,
        college: this.selectedRow.college,
        birthCountry: this.selectedRow.birthCountry,
        birthCityState: this.selectedRow.birthCityState,
        dateOfBirth: this.selectedRow.dateOfBirth ? new Date(this.selectedRow.dateOfBirth) : null,
        handed: this.selectedRow.handed,
        goals: this.normalizeOptionalNumber(this.selectedRow.goals),
        penaltyMinutes: this.normalizeOptionalNumber(this.selectedRow.penaltyMinutes),
        points: this.normalizeOptionalNumber(this.selectedRow.points),
        savePct: this.normalizeOptionalNumber(this.selectedRow.savePct)
      };

      this.nhlService.SaveRoster(playerToSave).subscribe({
        next: data => {
          console.log('Player updated successfully', data);
          this.errMessage = "Player updated successfully!";
          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster();
              this.display = false;
              this.resetAction();
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error saving the player!', error);
          this.errMessage = "There was an error saving the player. Please try again.";
          this.display = true;
        }
      });
    }
  }

  add() {
    this.isSubmitted = true;
    if (this.nhlForm.valid) {
      const playerToAdd = {
        playerId: -1,
        team: this.nhlForm.get('team')?.value,
        league: this.nhlForm.get('league')?.value,
        name: [this.nhlForm.get('firstName')?.value, this.nhlForm.get('lastName')?.value].filter((x: string) => !!x).join(' ').trim(),
        position: this.nhlForm.get('position')?.value,
        number: this.nhlForm.get('number')?.value,
        draftYear: this.normalizeOptionalNumber(this.nhlForm.get('draftYear')?.value),
        seasonYear: this.normalizeOptionalNumber(this.nhlForm.get('seasonYear')?.value),
        height: feetInchesToInches(this.nhlForm.get('height')?.value || ''),
        weight: this.nhlForm.get('weight')?.value,
        college: this.nhlForm.get('college')?.value,
        birthCountry: this.nhlForm.get('birthCountry')?.value,
        birthCityState: this.nhlForm.get('birthCityState')?.value,
        dateOfBirth: this.nhlForm.get('dateOfBirth')?.value ? new Date(this.nhlForm.get('dateOfBirth')?.value) : null,
        handed: this.nhlForm.get('handed')?.value,
        goals: this.normalizeOptionalNumber(this.nhlForm.get('goals')?.value),
        penaltyMinutes: this.normalizeOptionalNumber(this.nhlForm.get('penaltyMinutes')?.value),
        points: this.normalizeOptionalNumber(this.nhlForm.get('points')?.value),
        savePct: this.normalizeOptionalNumber(this.nhlForm.get('savePct')?.value)
      };

      this.nhlService.AddRoster(playerToAdd).subscribe({
        next: data => {
          console.log('Player added successfully', data);
          this.errMessage = "Player added successfully!";
          timer(2000).pipe(
            switchMap(() => {
              this.loadRoster();
              this.display = false;
              this.resetAction();
              return [];
            })
          ).subscribe();
        },
        error: error => {
          console.error('There was an error adding the player!', error);
          this.errMessage = "There was an error adding the player. Please try again.";
          this.display = true;
        }
      });
    }
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
    this.isSubmitted = false;
    this.nhlForm.reset();
    this.nhlForm.markAsUntouched();
  }
}
