import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { NBARosterDto } from '../../services/nba';
import { NbaService } from '../../services/nba.service';
import { formatDateMMDDYYYY } from 'src/app/common/formatters/date-formatter';

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

  ngOnInit(): void {
    this.nbaForm = new FormGroup({
      team: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      position: new FormControl('', [Validators.required,
      nonEmptyStringValidator()]),
      number: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]+$')]), // numbers only
      height: new FormControl(null, [Validators.required,
      Validators.pattern('^[0-9]+\' [0-9]{1,2}"$')]), // feet and inches (e.g. 6'9")
      weight: new FormControl(null, [Validators.required,
      Validators.min(98),
      Validators.max(500),
      Validators.pattern('^[0-9]+$')]),
      dateOfBirth: new FormControl(null,
        [Validators.required,
        yearRangeValidator(1900, new Date().getFullYear()), // Use the custom validator
        Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/(19|20)\\d{2}$')]
      ),
      college: new FormControl(''),
      playerID: new FormControl({ value: '', disabled: true })
    });
    this.loadRoster();
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
    this.isSubmitted = false;
    this.nbaForm.reset();
  }

  loadRoster() {
    this.isLoading = true;
    this.nbaService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
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
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row }; // Create a copy of the row to edit
    this.setFormValues(row);
    this.display = true;
  }

  deleteRow(row: any) {
    this.resetAction();
    this.display = false;
    this.delete(row.playerID);
  }

  save() {
    if (this.nbaForm.valid) {
      // Update the selectedRow with the form values
      this.refreshSelectedRow();

      const playerToSave: NBARosterDto = {
        playerID: this.selectedRow.playerID,
        team: this.selectedRow.team || '',
        firstName: this.selectedRow.firstName || '',
        lastName: this.selectedRow.lastName || '',
        position: this.selectedRow.position || '',
        number: this.selectedRow.number || '',
        height: this.selectedRow.height || '',
        weight: this.selectedRow.weight || '',
        dateOfBirth: this.selectedRow.dateOfBirth ? new Date(this.selectedRow.dateOfBirth) : null,
        college: this.selectedRow.college || ''
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
          this.errMessage = "There was an error saving the player. Please try again.";
          this.display = true;
        }
      });
    }
  }

  add() {

    if (this.nbaForm.valid) {

      const playerToAdd: NBARosterDto = {
        playerID: -1, // Adds will generate a new ID
        team: this.nbaForm.get('team')?.value || '',
        firstName: this.nbaForm.get('firstName')?.value || '',
        lastName: this.nbaForm.get('lastName')?.value || '',
        position: this.nbaForm.get('position')?.value || '',
        number: this.nbaForm.get('number')?.value || '',
        height: this.nbaForm.get('height')?.value || '',
        weight: this.nbaForm.get('weight')?.value || '',
        dateOfBirth: this.nbaForm.get('dateOfBirth')?.value ? new Date(this.nbaForm.get('dateOfBirth')?.value) : null,
        college: this.nbaForm.get('college')?.value || ''
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
          this.errMessage = "There was an error adding the player. Please try again.";
          this.display = true;
        }
      });
    }
  }

  delete(playerID: string) {
    if (!playerID) {
      console.error('No player selected to delete!');
      this.errMessage = "No player selected to delete!";
      this.display = true;
      return;
    }
    this.nbaService.DeleteRoster(playerID).subscribe({
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
  }

  onDialogHide() {
    this.selectedRow = {}
  };

  setFormValues(row: any) {

    this.nbaForm.setValue({
      team: row.team || '',
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      position: row.position || '',
      number: row.number || '',
      height: row.height || '',
      weight: row.weight || '',
      dateOfBirth: row.dateOfBirth ? formatDateMMDDYYYY(new Date(row.dateOfBirth)) : '',
      college: row.college || '',
      playerID: row.playerID || ''
    });

  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.nbaForm.value, // Get all the current form values
      playerID: this.selectedRow.playerID
    };
  }
}
