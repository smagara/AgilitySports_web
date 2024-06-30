import { Component, OnInit } from '@angular/core';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit{

  roster: any = [];
  isLoading: boolean = false;

  constructor(private nbaService:NbaService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.nbaService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NBA data from the service!', error);
        this.isLoading = false;
      }
    })
  }
}
