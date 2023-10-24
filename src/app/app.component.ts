import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { slideInAnimation } from './app.animations'
import { Router } from '@angular/router';

@Component({
  selector: 'sports-root',
  templateUrl: './app.component.html',
  styles: [],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'AgilitySports';
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  navigate(pageName: string) {
    // fix for child routes opening in another new browser tab
    this.router.navigate([`/${pageName}`], { skipLocationChange: true });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Baseball',
        items: [
          {
            label: 'Roster',
            url: 'mlb/roster',
            disabled: false
          },
          {
            label: 'Attendance',
            //url: 'mlb/attendance',
            disabled: false,
            items: [
              {
                label: "Table",
                url: 'mlb/attendance'
              },
              {
                label: "Chart",
                url: 'mlb/attend-chart'
              }
            ]
          }
        ]
      },

      {
        label: 'Football',
        items:
          [
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
      },

      {
        label: 'Basketball',
        items: [
          {
            label: 'Roster',
            url: 'nba/roster',
          }
        ]
      },
      {
        label: 'Hockey',
        items: [
          {
            label: 'Roster',
            url: 'nhl/roster',
          }
        ]
      },

      {
        label: 'PGA',
        items: [
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
      },
    ];
  }
}
