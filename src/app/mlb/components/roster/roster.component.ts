import { Component, OnInit } from '@angular/core';
import { MlbService } from '../../services/mlb.service';

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
      "firstName": "Shoeless",
      "lastName" : "Joe",
      "team": "Nickerbockers",
      "position": "SS",
      "bats": "L",
      "dateOfBirth": "12/01/19",
      "birthPlace": "Test Data, Washington",
      "birthCountry": "USA"
    }
  ];

  constructor (private mlbService: MlbService) {}

  ngOnInit(): void {
    this.mlbService.GetRoster().subscribe({
      next: newdata => {this.roster = newdata;}
    })
    
  }
}
