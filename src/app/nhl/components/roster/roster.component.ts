import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
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
  handedList: { label: string, hand: string }[] = [
    { label: '*** Please Select ***', hand: '' },
    { label: 'Left', hand: 'L' },
    { label: 'Right', hand: 'R' },
    { label: 'Both', hand: 'B' }];

  constructor(private nhlService: NhlService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.nhlForm = new FormGroup({
      team: new FormControl('', [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      name: new FormControl('',  [Validators.required, nonEmptyStringValidator(), noXssValidator()]),
      position: new FormControl('', [Validators.required /*, nonEmptyStringValidator() not needed */]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // numbers only
      handed: new FormControl(null, [Validators.required]),
      drafted: new FormControl(null, [Validators.required, yearRangeValidator(1900, currentYear), Validators.pattern('^[0-9]{4}$')]),
      birthCountry: new FormControl('', [noXssValidator()]),
      birthPlace: new FormControl('', [noXssValidator()]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(55), Validators.pattern('^[0-9]+$')]),
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

  save() {
    this.isSubmitted = true;
    if (this.nhlForm.valid) {
      this.refreshSelectedRow();
      this.nhlService.SaveRoster(this.selectedRow).subscribe({
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
      this.nhlService.AddRoster(this.nhlForm.value).subscribe({
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
