import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterDetailComponent } from './roster-detail.component';

describe('RosterDetailComponent', () => {
  let component: RosterDetailComponent;
  let fixture: ComponentFixture<RosterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterDetailComponent]
    });
    fixture = TestBed.createComponent(RosterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
