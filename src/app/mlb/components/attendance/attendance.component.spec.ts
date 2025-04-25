import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MlbService } from '../../services/mlb.service';
import { AttendanceComponent } from './attendance.component';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;
  let mlbService: MlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [MlbService]
    });
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    mlbService = TestBed.inject(MlbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
