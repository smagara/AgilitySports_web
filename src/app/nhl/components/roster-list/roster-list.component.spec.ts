import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 97,
      team: 'EDM',
      teamName: 'Edmonton Oilers',
      firstName: 'Connor',
      lastName: 'McDavid'
    },
    {
      playerId: 88,
      team: 'CHI',
      teamName: 'Chicago Blackhawks',
      name: 'Patrick Kane'
    },
    {
      playerId: 34,
      team: 'TOR',
      teamName: 'Toronto Maple Leafs',
      firstName: 'Auston',
      lastName: 'Matthews'
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
    component.filterDraft = { playerId: '34', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(34);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'Edmonton Oilers', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].teamName).toBe('Edmonton Oilers');
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Con', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(97);
  });

  it('filters by lastName starts with using name fallback', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Ka' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(88);
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '97', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
