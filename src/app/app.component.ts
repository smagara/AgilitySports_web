import { Component, OnInit} from '@angular/core';
import { MegaMenuItem } from 'primeng/api/megamenuitem';

@Component({
  selector: 'sports-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'AgilitySports';
  items: MegaMenuItem[] | undefined

  ngOnInit() {
    this.items = [
      {
        label: 'NFL',
        items: [
          [
            {
              label: 'National Football League',
              items: [
                {
                  label: 'Roster',
                  url: 'nfl/roster'
                },
                {
                  label: 'Team',
                  url: 'nfl/team'
                },
                {
                  label: 'Schedule',
                  url: 'nfl/schedule'
                }
              ]
            }
          ],
        ]
      },
      {
        label: 'MLB',
        url: 'mlb'
      },
      {
        label: 'NBA',
        url: 'nba'
      },
      {
        label: 'NHL',
        url: 'nhl'
      },
      {
        label: 'PGA',
        items: [
          [
            {
              label: 'Professional Golf',
              items: [
                {
                  label: 'Season',
                  url: 'pga/season',
                },
                {
                  label: 'Tournament',
                  url: 'pga/tournament'
                }
              ]
            }
          ]
        ],
      },
    ];
  }
}
