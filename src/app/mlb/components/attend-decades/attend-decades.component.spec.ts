import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MlbService } from '../../services/mlb.service';
import { AttendDecadesComponent } from './attend-decades.component';

describe('AttendChartComponent', () => {
  let component: AttendDecadesComponent;
  let fixture: ComponentFixture<AttendDecadesComponent>;
  let mlbService: MlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendDecadesComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [MlbService]
    });
    fixture = TestBed.createComponent(AttendDecadesComponent);
    component = fixture.componentInstance;
    mlbService = TestBed.inject(MlbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
