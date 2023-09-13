import { Component, OnInit } from '@angular/core';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit{

  roster: any = [
    {
      team: '76ers',
      firstName: 'Donald',
      lastName: 'Duck',
      position: 'F',
      number: '1'
    },
    {
      team: '76ers',
      firstName: 'Yosemite',
      lastName: 'Sam',
      position: 'WB',
      number: '11'
    }
  ];
  
  constructor(private nbaService:NbaService) {}

  ngOnInit(): void {
    this.nbaService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
      }
    })
  }

}
