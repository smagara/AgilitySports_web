import { Component, OnInit } from '@angular/core';
import { NhlService } from '../../services/nhl.service';
import { NHLRosterDto } from '../../services/nhl';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
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
    this.isLoading = true;
    this.loadRoster();
    this.isLoading = false;
  }

  resetAction() {
    this.errMessage = "";
    this.isAdding = false;
  }

  loadRoster() {
    this.nhlService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
      },
      error: error => {
        console.error('There was an error fetching NHL roster data from the service!', error);
      }
    })
  }

  addRow() {
    this.resetAction();
    this.isAdding = true;
    this.display = true;
  }

  editRow(row: any) {
    this.resetAction();
    this.selectedRow = { ...row }; // Create a copy of the row to edit
    this.display = true;
  }

  deleteRow(row: any) {
    this.resetAction();
    this.display = false;
    this.delete(row.playerID);
  }

  save() {
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
    })
  }

  add() {
    this.nhlService.AddRoster(this.selectedRow).subscribe({
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
    })
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
}

