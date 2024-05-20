import { Component, OnInit } from '@angular/core';
import { NhlService } from '../../services/nhl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  roster: any = [];
  isLoading: boolean = false;

  constructor(
    private nhlService: NhlService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.nhlService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching NHL data from the service!', error);
        this.isLoading = false;
      }
    })
  }

}
