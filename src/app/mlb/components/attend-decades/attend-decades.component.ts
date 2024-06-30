import { Component, OnInit } from '@angular/core';
import { MlbService } from '../../services/mlb.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'sports-attend-chart',
  templateUrl: './attend-decades.component.html'
})
export class AttendDecadesComponent implements OnInit {

  title = 'Baseball Attendance over the Decades';
  yearChoices: { label: string, theYear: string }[] = [];

  chartColors: string[] = [];
  chartData: any;
  isLoading: boolean = false;

  private _beginYear: string = "0";
  public get beginYear(): string {
    return this._beginYear;
  }
  public set beginYear(value: string) {
    if (this._beginYear != value) {
      this._beginYear = value;
      console.info("Begin filter: " + this._beginYear);
      this.getTheData();
    }
  }

  private _endYear: string = "0";
  public get endYear(): string {
    return this._endYear;
  }
  public set endYear(value: string) {
    if (this._endYear != value) {
      this._endYear = value;
      console.info("End filter: " + this._endYear);
      this.getTheData();
    }
  }

  constructor(private mlbService: MlbService) {
    this._beginYear = "1920";
    this._endYear = "2020";
    // populate Year (decade) options
    for (let year: number = 1920; year <= 2020; year += 10) {
      var option = { label: year.toString(), theYear: year.toString() };
      this.yearChoices.push(option);
    }
  }

  ngOnInit(): void {
    this.getTheData();
  }

  getTheData(): void {
    this.isLoading = true;
    this.mlbService.GetAttendanceDecades(Number(this.beginYear), Number(this.endYear)).pipe(
      tap((newstats: any) => {
        this.chartData = newstats;
        this.isLoading = false;
      }),
      catchError((err: string) => {
        this.isLoading = false;
        console.error('Error fetching baseball decade attendance from the service: ' + err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

}
