import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RosterListComponent } from './roster-list.component';

describe('RosterListComponent', () => {
  let component: RosterListComponent;
  let fixture: ComponentFixture<RosterListComponent>;

  const sampleRoster = [
    {
      playerId: 11,
      team: 'BOS',
      teamName: 'Boston Celtics',
      firstName: 'Jayson',
      lastName: 'Tatum'
    },
    {
      playerId: 30,
      team: 'GSW',
      teamName: 'Golden State Warriors',
      firstName: 'Stephen',
      lastName: 'Curry'
    },
    {
      playerId: 3,
      team: 'GSW',
      teamName: 'Golden State Warriors',
      firstName: 'Jordan',
      lastName: 'Poole'
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
    component.filterDraft = { playerId: '30', team: '', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].playerId).toBe(30);
  });

  it('filters by selected team option', () => {
    component.filterDraft = { playerId: '', team: 'Golden State Warriors', firstName: '', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(2);
    expect(component.filteredRoster.every((x: any) => x.teamName === 'Golden State Warriors')).toBeTrue();
  });

  it('filters by firstName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: 'Ste', lastName: '' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].firstName).toBe('Stephen');
  });

  it('filters by lastName starts with', () => {
    component.filterDraft = { playerId: '', team: '', firstName: '', lastName: 'Ta' };
    component.applyFilter();

    expect(component.filteredRoster.length).toBe(1);
    expect(component.filteredRoster[0].lastName).toBe('Tatum');
  });

  it('resets all filters and restores full grid', () => {
    component.filterDraft = { playerId: '11', team: '', firstName: '', lastName: '' };
    component.applyFilter();
    expect(component.filteredRoster.length).toBe(1);

    component.resetAllFilters();
    expect(component.filteredRoster.length).toBe(sampleRoster.length);
  });
});
