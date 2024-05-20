import { Component, OnInit } from '@angular/core';
import { NflService } from '../../services/nfl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent {
  roster: any = [];
  isLoading: boolean = false;

  constructor(
    private nflService: NflService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.nflService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NFL data from the service!', error);
        this.isLoading = false;
      }
    })
  }

}
