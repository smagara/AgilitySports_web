import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { RosterDetailComponent } from './roster-detail.component';

@Component({
  selector: 'app-position-dropdown',
  template: '<select></select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockPositionDropdownComponent),
      multi: true
    }
  ]
})
class MockPositionDropdownComponent {
  @Input() sport: string = '';
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-league-dropdown',
  template: '<select></select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockLeagueDropdownComponent),
      multi: true
    }
  ]
})
class MockLeagueDropdownComponent {
  @Input() sport: string = '';
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-team-dropdown',
  template: '<select></select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockTeamDropdownComponent),
      multi: true
    }
  ]
})
class MockTeamDropdownComponent {
  @Input() sport: string = '';
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-handedness-dropdown',
  template: '<select></select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockHandednessDropdownComponent),
      multi: true
    }
  ]
})
class MockHandednessDropdownComponent {
  @Input() includeBoth: boolean = true;
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

describe('RosterDetailComponent', () => {
  let component: RosterDetailComponent;
  let fixture: ComponentFixture<RosterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterDetailComponent, MockPositionDropdownComponent, MockLeagueDropdownComponent, MockTeamDropdownComponent, MockHandednessDropdownComponent],
      imports: [ReactiveFormsModule, DialogModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(RosterDetailComponent);
    component = fixture.componentInstance;
    component.mlbForm = new FormGroup({
      teamCode: new FormControl(''),
      league: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      position: new FormControl(''),
      number: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
      bats: new FormControl(''),
      throws: new FormControl(''),
      dateOfBirth: new FormControl(''),
      birthCountry: new FormControl(''),
      birthPlace: new FormControl(''),
      playerId: new FormControl(''),
      battingAverage: new FormControl(''),
      homeRuns: new FormControl(''),
      era: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
