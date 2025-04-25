import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MlbService } from '../../services/mlb.service';
import { AttendChartComponent } from './attend-chart.component';

describe('AttendChartComponent', () => {
  let component: AttendChartComponent;
  let fixture: ComponentFixture<AttendChartComponent>;
  let mlbService: MlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendChartComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [MlbService]
    });
    fixture = TestBed.createComponent(AttendChartComponent);
    component = fixture.componentInstance;
    mlbService = TestBed.inject(MlbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
