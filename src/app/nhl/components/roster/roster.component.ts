import { Component, OnInit } from '@angular/core';
import { NhlService } from '../../services/nhl.service';

@Component({
  selector: 'sports-roster',
  templateUrl: './roster.component.html',
  styles: [
  ]
})
export class RosterComponent implements OnInit {
  roster: any = [
    {
      "playerID": 1,
      "name": "Micky Mouse",
      "team": "Bruins",
      "number": "77",
      "position": "C",
      "handed": "L",
      "age": 124,
      "drafted": 1940,
      "birthPlace": "Orlando, Florida",
      "birthCountry": "USA"
    },
    {
      "playerID": 2,
      "name": "Minnie Mouse",
      "team": "Flyers",
      "number": "79",
      "position": "C",
      "handed": "R",
      "age": 121,
      "drafted": 1942,
      "birthPlace": "Orlando, Florida",
      "birthCountry": "USA"
    }
  ];

  constructor(
    private nhlService: NhlService
  ) { }

  ngOnInit(): void {
    this.nhlService.GetRoster().subscribe({
      next: data => {
        this.roster = data;
      }
    })
  }

}
