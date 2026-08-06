import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 106427,
      team: 'PGA',
      teamName: 'PGA Tour',
      firstName: 'Scottie',
      lastName: 'Scheffler'
    },
    {
      playerId: 106343,
      team: 'PGA',
      teamName: 'PGA Tour',
      firstName: 'Collin',
      lastName: 'Morikawa'
    },
    {
      playerId: 106400,
      team: 'PGA',
      teamName: 'PGA Tour',
      firstName: 'Jon',
      lastName: 'Rahm'
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
    component.filterDraft = { playerId: '106343', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(106343);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'PGA Tour', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(3);
    expect(component.filteredRoster.every((x: any) => x.teamName === 'PGA Tour')).toBeTrue();
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Sco', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].firstName).toBe('Scottie');
  });

  it('filters by lastName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Mo' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].lastName).toBe('Morikawa');
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '106427', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
