import { Component, OnInit } from '@angular/core';
import { MlbService } from '../../services/mlb.service';

@Component({
  selector: 'sports-attend-chart',
  templateUrl: './attend-chart.component.html'
})
export class AttendChartComponent implements OnInit {
  type = 'pie';
  title = 'Baseball Attendance Testing';
  yearChoices: { label: string, theYear: string } [] = [];

  chartColors: string[] = ["#1c9ea6",
    "#31e3c4",
    "#72a7a8",
    "#ffa700",
    "#7fffd4",
    "#af6f09",
    "#4d7071",
    "#722f37",
    "#f4a460",
    "#ab6819",
    "#c7c10c"]

  chartData : any = {
    "type" : "pie",
    "borderColor": "black",
    "borderWidth" : "1",
    "labels": [
      this.title
    ],
    "datasets": [
      {
        "label": "Philadelphia Athletics",
        "backgroundColor": this.chartColors[0],
        "borderColor": "black",
        "borderWidth" : "1",
        "data": [
          "869703"
        ]
      },
      {
        "label": "Detroit Tigers",
        "backgroundColor": this.chartColors[1],
        "borderColor": "black",
        "borderWidth" : "1",
        "data": [
          "820766"
        ]
      },
      {
        "label": "Pittsburgh Pirates",
        "backgroundColor": this.chartColors[2],
        "data": [
          "804354"
        ]
      },
      {
        "label": "New York Giants",
        "backgroundColor": this.chartColors[3],
        "data": [
          "778993"
        ]
      },
      {
        "label": "Brooklyn Robins",
        "backgroundColor": this.chartColors[4],
        "data": [
          "659435"
        ]
      }
    ]
  };

  private _yearFilter: number = 2022;
  public get yearFilter(): number {
    return this._yearFilter;
  }
  public set yearFilter(value: number) {
    this._yearFilter = value;
    console.info("Year filter: " + this._yearFilter);
    this.getTheData();
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

  getTheData() : void {
    this.mlbService.GetAttendanceChart(this._yearFilter).subscribe(
      {
        next: newstats => { this.chartData = newstats}
      })
  }

  setType(type: string)
  {
    this
  }
}
