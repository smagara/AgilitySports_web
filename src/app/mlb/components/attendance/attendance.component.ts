import { Component, OnInit } from '@angular/core';

import { MlbService } from '../../services/mlb.service';

@Component({
  selector: 'sports-attendance',
  templateUrl: './attendance.component.html',
  styles: [
  ]
})
export class AttendanceComponent implements OnInit {
  attendstats: any = [
    {
      "yearId": 1980,
      "teamName": "The Testers",
      "parkName" : "TestCtr",
      "attendance": "33889",
    }
  ];

  constructor(private mlbService: MlbService) {}

  ngOnInit(): void {
    this.mlbService.GetAttendance().subscribe({
      next: newstats => { this.attendstats = newstats}
    })
  }
}
