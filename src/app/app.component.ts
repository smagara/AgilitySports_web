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
            label: 'MLB Roster',
            routerLink: 'mlb/roster',
            disabled: false
          },
          {
            label: 'Attendance',
            disabled: false,
            items: [
              {
                label: "Table",
                routerLink: 'mlb/attendance'
              },
              {
                label: "Chart",
                routerLink: 'mlb/attend-chart'
              },
              {
                label: "By Decade",
                routerLink: 'mlb/attend-decades'
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
              label: 'NFL Roster',
              routerLink: 'nfl/roster',
              disabled: false
            },
            {
              label: 'Team',
              routerLink: 'nfl/team',
              disabled: true
            },
            {
              label: 'Schedule',
              routerLink: 'nfl/schedule',
              disabled: true
            }
          ]
      },

      {
        label: 'Basketball',
        items: [
          {
            label: 'NBA Roster',
            routerLink: 'nba/roster',
          }
        ]
      },
      {
        label: 'Hockey',
        items: [
          {
            label: 'NHL Roster',
            routerLink: 'nhl/roster',
          }
        ]
      },

      {
        label: 'Soccer',
        items: [
          {
            label: 'FIFA Roster',
            routerLink: 'fif/roster',
          }
        ]
      },

      {
        label: 'Golf',
        items: [
          {
            label: 'PGA Roster',
            routerLink: 'pga/roster',
          }
        ]
      },
    ];
  }
}
