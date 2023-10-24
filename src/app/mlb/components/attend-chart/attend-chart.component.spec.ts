import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendChartComponent } from './attend-chart.component';

describe('AttendChartComponent', () => {
  let component: AttendChartComponent;
  let fixture: ComponentFixture<AttendChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendChartComponent]
    });
    fixture = TestBed.createComponent(AttendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
