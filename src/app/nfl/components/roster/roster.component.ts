import { Component, OnInit } from '@angular/core';
import { NflService } from '../../services/nfl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent {
  roster: any = [
    {
      team: 'PHL',
      name: 'Jalen Hurts',
      position: 'QB',
      number: '1'
    },
    {
      team: 'PHL',
      name: 'AJ Brown',
      position: 'WR',
      number: '11'
    }
  ];

  constructor(
    private nflService: NflService
  ) { }

  ngOnInit(): void {
    this.nflService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
      }
    })
  }

}
