import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NhlService } from '../../services/nhl.service';
import { NHLRosterDto } from '../../services/nhl';
import { yearRangeValidator } from 'src/app/common/validators/year-range';
import { delay } from 'rxjs';

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

  constructor(
    private nhlService: NhlService
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.nhlForm = new FormGroup({
      team: new FormControl(''),
      name: new FormControl(''),
      position: new FormControl(''),
      number: new FormControl(''),
      handed: new FormControl(''),
      drafted: new FormControl(null,
        [Validators.required,
        yearRangeValidator(1900, currentYear), // Use the custom validator
        Validators.pattern('^[0-9]{4}$')]
      ),
      birthCountry: new FormControl(''),
      birthPlace: new FormControl(''),
      age: new FormControl('',
        [Validators.required,
        Validators.min(18),
        Validators.max(55),
        Validators.pattern('^[0-9]+$')] // numbers only
      ),
      playerID: new FormControl({ value: '', disabled: true })
    });

    this.loadRoster();
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
    this.nhlForm.reset();
  }

  loadRoster() {
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

  deleteRow(row: any) {
    this.resetAction();
    this.display = false;
    this.delete(row.playerID);
  }

  save() {
    if (this.nhlForm.valid) {
      // Update the selectedRow with the form values
      this.refreshSelectedRow();

      this.nhlService.SaveRoster(this.selectedRow).subscribe({
        next: data => {
          console.log('Player saved successfully', data);
          this.loadRoster(); // reload the grid
          this.display = false;
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

    if (this.nhlForm.valid) {

      this.nhlService.AddRoster(this.nhlForm.value).subscribe({
        next: data => {
          console.log('Player added successfully', data);
          this.loadRoster(); // reload the grid
          this.display = false;
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
  }

  onDialogHide() {
    this.selectedRow = {}
  };

  setFormValues(row: any) {

    this.nhlForm.setValue({
      team: row.team || '',
      name: row.name || '',
      position: row.position || '',
      number: row.number || '',
      handed: row.handed || '',
      drafted: row.drafted || '',
      birthCountry: row.birthCountry || '',
      birthPlace: row.birthPlace || '',
      age: row.age || '',
      playerID: row.playerID || ''
    });

  }

  refreshSelectedRow() {
    this.selectedRow = {
      ...this.nhlForm.value, // Get all the current form values
      playerID: this.selectedRow.playerID
    };
  }
}


