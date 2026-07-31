import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 12,
      team: 'KC',
      teamName: 'Kansas City Chiefs',
      firstName: 'Patrick',
      lastName: 'Mahomes'
    },
    {
      playerId: 17,
      team: 'BUF',
      teamName: 'Buffalo Bills',
      firstName: 'Josh',
      lastName: 'Allen'
    },
    {
      playerId: 87,
      team: 'KC',
      teamName: 'Kansas City Chiefs',
      firstName: 'Travis',
      lastName: 'Kelce'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RosterListComponent);
    component = fixture.componentInstance;
    component.roster = sampleRoster as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters by exact playerId', () => {
    component.filterDraft = { playerId: '17', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(17);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'Kansas City Chiefs', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(2);
    expect(component.filteredRoster.every((x: any) => x.teamName === 'Kansas City Chiefs')).toBeTrue();
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Pat', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].firstName).toBe('Patrick');
  });

  it('filters by lastName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Ke' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].lastName).toBe('Kelce');
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '12', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
