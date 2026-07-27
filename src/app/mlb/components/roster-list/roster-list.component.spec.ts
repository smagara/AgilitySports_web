import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 100,
      team: 'NYY',
      teamName: 'New York Yankees',
      firstName: 'Aaron',
      lastName: 'Judge'
    },
    {
      playerId: 200,
      team: 'BOS',
      teamName: 'Boston Red Sox',
      firstName: 'Rafael',
      lastName: 'Devers'
    },
    {
      playerId: 300,
      team: 'BOS',
      teamName: 'Boston Red Sox',
      firstName: 'Alex',
      lastName: 'Cora'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RosterListComponent);
    component = fixture.componentInstance;
    component.roster = sampleRoster;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters by exact playerId', () => {
    component.filterDraft = { playerId: '200', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(200);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'BOS', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(2);
    expect(component.filteredRoster.every((x) => String(x.team).toUpperCase() === 'BOS')).toBeTrue();
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Aa', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].firstName).toBe('Aaron');
  });

  it('filters by lastName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Co' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].lastName).toBe('Cora');
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '100', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
