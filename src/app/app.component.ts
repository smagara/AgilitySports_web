import { Component, OnInit} from '@angular/core';
import { MegaMenuItem } from 'primeng/api/megamenuitem';
import { slideInAnimation } from './app.animations'

@Component({
  selector: 'sports-root',
  templateUrl: './app.component.html',
  styles: [],
  animations: [slideInAnimation]
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
                  url: 'nfl/roster',
                  disabled: false
                },
                {
                  label: 'Team',
                  url: 'nfl/team',
                  disabled: true
                },
                {
                  label: 'Schedule',
                  url: 'nfl/schedule',
                  disabled: true
                }
              ]
            }
          ],
        ]
      },
      
      {
        label: 'MLB',
        items: [
          [
            {
              label: 'Major League Baseball',
              items: [
                {
                  label: 'Roster',
                  url: 'mlb/roster',
                  disabled: false
                },
                {
                  label: 'Attendance',
                  url: 'mlb/attendance',
                  disabled: false
                }              ]
            }
          ]
        ],
      },

      {
        label: 'NBA',
        items: [
          [
            {
              label: 'National Basketball Association',
              items: [
                {
                  label: 'Roster',
                  url: 'nba/roster',
                }
              ]
            }
          ]
        ],
      },
      {
        label: 'NHL',
        items: [
          [
            {
              label: 'National Hockey League',
              items: [
                {
                  label: 'Roster',
                  url: 'nhl/roster',
                }
              ]
            }
          ]
        ],
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
                  disabled: true
                },
                {
                  label: 'Tournament',
                  url: 'pga/tournament',
                  disabled: true
                }
              ]
            }
          ]
        ],
      },
    ];
  }
}
