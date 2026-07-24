import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';
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

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.nhlForm = new FormGroup({
      team: new FormControl('', [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      league: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('',  [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      lastName: new FormControl('',  [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      position: new FormControl('', [Validators.required /*, nonEmptyStringValidator() not needed */]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // numbers only
      handed: new FormControl(null, [Validators.required]),
      drafted: new FormControl(null, [Validators.required, yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      dateOfBirth: new FormControl('', [Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthPlace: new FormControl('', [noXssValidator()]),
      playerID: new FormControl({ value: '', disabled: true })
    });

    this.loadRoster();
  }

  loadRoster() {
    this.resetAction();
    this.isLoading = true;
    this.nhlService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
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
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row }; // Create a copy of the row to edit
    this.setFormValues(row);
    this.display = true;
  }

  deleteRow(playerID: string) {
    if (!playerID) {
      console.error('No player selected to delete!');
      this.errMessage = "No player selected to delete!";
      this.display = true;
      return;
    }
    this.nhlService.DeleteRoster(playerID).subscribe({
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
      handed: row.handed || '',
      drafted: row.drafted || '',
      dateOfBirth: row.dateOfBirth ? formatDateMMDDYYYY(new Date(row.dateOfBirth)) : '',
      birthCountry: row.birthCountry || '',
      birthPlace: row.birthPlace || '',
      playerID: row.playerID || ''
    });
  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.nhlForm.value, // Get all the current form values
      playerID: this.selectedRow.playerID
    };
  }

  save() {
    this.isSubmitted = true;
    if (this.nhlForm.valid) {
      this.refreshSelectedRow();

      const playerToSave = {
        playerID: this.selectedRow.playerID,
        team: this.selectedRow.team,
        league: this.selectedRow.league,
        name: [this.selectedRow.firstName, this.selectedRow.lastName].filter((x: string) => !!x).join(' ').trim(),
        position: this.selectedRow.position,
        number: this.selectedRow.number,
        handed: this.selectedRow.handed,
        drafted: this.selectedRow.drafted,
        birthCountry: this.selectedRow.birthCountry,
        birthPlace: this.selectedRow.birthPlace,
        dateOfBirth: this.selectedRow.dateOfBirth ? new Date(this.selectedRow.dateOfBirth) : null
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
        playerID: -1,
        team: this.nhlForm.get('team')?.value,
        league: this.nhlForm.get('league')?.value,
        name: [this.nhlForm.get('firstName')?.value, this.nhlForm.get('lastName')?.value].filter((x: string) => !!x).join(' ').trim(),
        position: this.nhlForm.get('position')?.value,
        number: this.nhlForm.get('number')?.value,
        handed: this.nhlForm.get('handed')?.value,
        drafted: this.nhlForm.get('drafted')?.value,
        birthCountry: this.nhlForm.get('birthCountry')?.value,
        birthPlace: this.nhlForm.get('birthPlace')?.value,
        dateOfBirth: this.nhlForm.get('dateOfBirth')?.value ? new Date(this.nhlForm.get('dateOfBirth')?.value) : null
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
