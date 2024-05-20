import { Component, OnInit } from '@angular/core';
import { MlbService } from '../../services/mlb.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {

  roster: any = [];
  isLoading: boolean = false;

  constructor (private mlbService: MlbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.mlbService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching Baseball data from the service!', error);
        this.isLoading = false;
      }
    })
  }
}
