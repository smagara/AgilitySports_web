import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendDecadesComponent } from './attend-decades.component';

describe('AttendChartComponent', () => {
  let component: AttendDecadesComponent;
  let fixture: ComponentFixture<AttendDecadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendDecadesComponent]
    });
    fixture = TestBed.createComponent(AttendDecadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
