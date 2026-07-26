import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { of } from 'rxjs';
import { MLBRosterDto } from '../../services/mlb';
import { MlbService } from '../../services/mlb.service';
import { RosterComponent } from './roster.component';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;
  let mlbService: MlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [MlbService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    mlbService = TestBed.inject(MlbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should derive league from team name when API league is blank', () => {
    const mockRoster: MLBRosterDto[] = [
      {
        playerId: '100001',
        teamName: 'Arizona Diamondbacks',
        firstName: 'Test',
        lastName: 'Player',
        league: '',
        position: 'Pitcher',
        height: '74',
        weight: '200',
        bats: 'R',
        throws: 'R',
        dateOfBirth: null,
        birthCountry: 'US',
        birthPlace: 'Phoenix'
      }
    ];

    spyOn(mlbService, 'GetRoster').and.returnValue(of(mockRoster));

    component.loadRoster();

    expect(component.roster[0].league).toBe('NL');
  });

  it('should keep league blank when team is unknown and API league is blank', () => {
    const mockRoster: MLBRosterDto[] = [
      {
        playerId: '100999',
        teamName: 'Unknown Team',
        firstName: 'Test',
        lastName: 'Player',
        league: '',
        position: 'Pitcher',
        height: '74',
        weight: '200',
        bats: 'R',
        throws: 'R',
        dateOfBirth: null,
        birthCountry: 'US',
        birthPlace: 'Anywhere'
      }
    ];

    spyOn(mlbService, 'GetRoster').and.returnValue(of(mockRoster));

    component.loadRoster();

    expect(component.roster[0].league).toBe('');
  });

  it('should ignore invalid league and derive league from team name', () => {
    const mockRoster: MLBRosterDto[] = [
      {
        playerId: '100010',
        teamName: 'New York Yankees',
        firstName: 'Test',
        lastName: 'Player',
        league: 'AB',
        position: 'Pitcher',
        height: '74',
        weight: '200',
        bats: 'R',
        throws: 'R',
        dateOfBirth: null,
        birthCountry: 'US',
        birthPlace: 'New York'
      }
    ];

    spyOn(mlbService, 'GetRoster').and.returnValue(of(mockRoster));

    component.loadRoster();

    expect(component.roster[0].league).toBe('AL');
  });
});
