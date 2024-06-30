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
  attendstats: MLBAttendanceDto[] = [];
  isLoading: boolean = false;
  private _yearFilter: string = '';
  public get yearFilter(): string {
    return this._yearFilter;
  }
  public set yearFilter(value: string) {
    this._yearFilter = value;
  }

  constructor(private mlbService: MlbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.mlbService.GetAttendance().subscribe({
      next: newstats => {
        this.attendstats = newstats;
        this.isLoading = false;
      },
      error: error => {
        console.error('There was an error fetching Baseball data from the service!', error);
        this.isLoading = false;
      }
    })
  }
}
