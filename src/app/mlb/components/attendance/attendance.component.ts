import { Component, OnInit } from '@angular/core';

import { MlbService } from '../../services/mlb.service';
import { MLBAttendanceDto } from '../../services/mlb';

@Component({
  selector: 'sports-attendance',
  templateUrl: './attendance.component.html',
  styles: [
  ]
})
export class AttendanceComponent implements OnInit {
  attendstats: MLBAttendanceDto[] = [
    {
      "yearId": '1980',
      "teamName": "The Testers",
      "parkName" : "TestCtr",
      "attendance": 33889,
      "teamId": "foo"
    }
  ];
  private _yearFilter: string = '';
  public get yearFilter(): string {
    return this._yearFilter;
  }
  public set yearFilter(value: string) {
    this._yearFilter = value;
  }

  constructor(private mlbService: MlbService) {}

  ngOnInit(): void {
    this.mlbService.GetAttendance().subscribe({
      next: newstats => { this.attendstats = newstats}
    })
  }
}
