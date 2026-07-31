import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 10,
      team: 'USA',
      teamName: 'United States',
      firstName: 'Alex',
      lastName: 'Morgan'
    },
    {
      playerId: 7,
      team: 'ARG',
      teamName: 'Argentina',
      firstName: 'Lionel',
      lastName: 'Messi'
    },
    {
      playerId: 9,
      team: 'USA',
      teamName: 'United States',
      firstName: 'Sophia',
      lastName: 'Smith'
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
    component.filterDraft = { playerId: '7', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(7);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'United States', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(2);
    expect(component.filteredRoster.every((x: any) => x.teamName === 'United States')).toBeTrue();
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Lio', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].firstName).toBe('Lionel');
  });

  it('filters by lastName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Sm' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].lastName).toBe('Smith');
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '10', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
