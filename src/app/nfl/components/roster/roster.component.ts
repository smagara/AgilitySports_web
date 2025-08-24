import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { noXssValidator } from 'src/app/common/validators/no-xss';
import { nonEmptyStringValidator } from 'src/app/common/validators/not-empty';
import { NFLRosterDto } from '../../services/nfl';
import { NflService } from '../../services/nfl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  nflForm!: FormGroup;
  roster: NFLRosterDto[] = [];
  isLoading: boolean = false;
  errMessage: string = "";
  display: boolean = false;
  selectedRow: any = {};
  isAdding: boolean = false;
  isSubmitted: boolean = false;

  constructor(private nflService: NflService) { }

  ngOnInit(): void {
    this.nflForm = new FormGroup({
      team: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      firstName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      lastName: new FormControl('', [Validators.required, noXssValidator(), nonEmptyStringValidator()]),
      position: new FormControl('', [Validators.required, nonEmptyStringValidator()]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // numbers only
      height: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+\' ?[0-9]{1,2}"$')]), // feet and inches (e.g. 6'9")
      weight: new FormControl(null, [Validators.required, Validators.min(98), Validators.max(500), Validators.pattern('^[0-9]+$')]),
      college: new FormControl('', [noXssValidator()]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // numbers only
      playerID: new FormControl({ value: '', disabled: true })
    });
    this.loadRoster();
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
    this.isSubmitted = false;
    this.nflForm.reset();
    this.nflForm.markAsUntouched();
  }

  loadRoster() {
    this.isLoading = true;
    this.nflService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NFL roster data from the service!', error);
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

  save() {
    this.isSubmitted = true;
    if (this.nflForm.valid) {
      // Update the selectedRow with the form values
      this.refreshSelectedRow();

      const playerToSave: NFLRosterDto = {
        playerID: this.selectedRow.playerID,
        team: this.selectedRow.team || '',
        firstName: this.selectedRow.firstName || '',
        lastName: this.selectedRow.lastName || '',
        position: this.selectedRow.position || '',
        number: this.selectedRow.number || '',
        height: this.selectedRow.height || '',
        weight: this.selectedRow.weight || '',
        college: this.selectedRow.college || '',
        age: this.selectedRow.age || 0
      };

      this.nflService.SaveRoster(playerToSave).subscribe({
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
    this.isSubmitted = true;
    if (this.nflForm.valid) {

      const playerToAdd: NFLRosterDto = {
        playerID: -1, // Adds will generate a new ID
        team: this.nflForm.get('team')?.value || '',
        firstName: this.nflForm.get('firstName')?.value || '',
        lastName: this.nflForm.get('lastName')?.value || '',
        position: this.nflForm.get('position')?.value || '',
        number: this.nflForm.get('number')?.value || '',
        height: this.nflForm.get('height')?.value || '',
        weight: this.nflForm.get('weight')?.value || '',
        college: this.nflForm.get('college')?.value || '',
        age: this.nflForm.get('age')?.value || 0
      };

      this.nflService.AddRoster(playerToAdd).subscribe({
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

  deleteRow(playerID: string) {
    if (!playerID) {
      console.error('No player selected to delete!');
      this.errMessage = "No player selected to delete!";
      this.display = true;
      return;
    }
    this.nflService.DeleteRoster(playerID).subscribe({
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

    this.nflForm.setValue({
      team: row.team || '',
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      position: row.position || '',
      number: row.number || '',
      height: row.height || '',
      weight: row.weight || '',
      college: row.college || '',
      playerID: row.playerID || '',
      age: row.age || 0
    });

  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.nflForm.value, // Get all the current form values
      playerID: this.selectedRow.playerID
    };
  }
}
