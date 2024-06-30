import { Component, OnInit } from '@angular/core';
import { MlbService } from '../../services/mlb.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'sports-attend-chart',
  templateUrl: './attend-chart.component.html'
})
export class AttendChartComponent implements OnInit {
  type = 'pie';
  title = 'Baseball Attendance';
  yearChoices: { label: string, theYear: string }[] = [];

  chartColors: string[] = [];
  chartData: any;
  isLoading: boolean = false;

  private _yearFilter: String = "2022";
  public get yearFilter(): String {
    return this._yearFilter;
  }
  public set yearFilter(value: String) {
    if (value !== this._yearFilter) {
      this._yearFilter = value;
      console.info("Year filter: " + this._yearFilter);
      this.getTheData();
    }
  }

  constructor(private mlbService: MlbService) {
    // populate Year options
    for (let year = 2022; year >= 1920; year--) {
      var option =  { label: year.toString(), theYear: year.toString() };
      this.yearChoices.push( option );
    }

    console.info("%j", this.yearChoices);
  }

  ngOnInit(): void {
    this.getTheData();
  }

  getTheData(): void {
    this.isLoading = true;
    this.mlbService.GetAttendanceChart(Number(this._yearFilter)).pipe(
      tap((newstats: any) => {
        this.chartData = newstats;
        this.isLoading = false;
      }),
      catchError((err: string) => {
        this.isLoading = false;
        console.error('Error fetching baseball attendance from the service: ' + err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  setType(type: string)
  {
    this
  }
}
