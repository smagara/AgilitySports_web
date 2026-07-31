import { Component, forwardRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
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

describe('RosterDetailComponent', () => {
  let component: RosterDetailComponent;
  let fixture: ComponentFixture<RosterDetailComponent>;
  let mockForm: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RosterDetailComponent,
        MockPositionDropdownComponent,
        MockLeagueDropdownComponent,
        MockTeamDropdownComponent
      ],
      imports: [
        ReactiveFormsModule,
        DialogModule,
        DropdownModule,
        NoopAnimationsModule
      ]
    });

    mockForm = new FormGroup({
      team: new FormControl(''),
      league: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      position: new FormControl(''),
      number: new FormControl(''),
      draftYear: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
      dateOfBirth: new FormControl(''),
      birthCountry: new FormControl(''),
      birthCityState: new FormControl(''),
      college: new FormControl(''),
      seasonYear: new FormControl(''),
      playerId: new FormControl(''),
      totalGoals: new FormControl(''),
      assists: new FormControl(''),
      saves: new FormControl('')
    });

    fixture = TestBed.createComponent(RosterDetailComponent);
    component = fixture.componentInstance;

    component.fifForm = mockForm;
    component.display = true;
    component.isAdding = false;
    component.isSubmitted = false;
    component.errMessage = '';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit hideDialog event when dialog is hidden', () => {
    spyOn(component.hideDialog, 'emit');
    component.onHideDialog();
    expect(component.hideDialog.emit).toHaveBeenCalled();
  });

  it('should emit save event when saving', () => {
    spyOn(component.save, 'emit');
    component.onSave();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should emit add event when adding', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalled();
  });

  it('should return true for validation when form is invalid and submitted', () => {
    component.isSubmitted = true;
    mockForm.get('team')?.setErrors({ required: true });
    expect(component.shouldValidate()).toBeTrue();
  });

  it('should return false for validation when form is valid', () => {
    component.isSubmitted = true;
    expect(component.shouldValidate()).toBeFalse();
  });

  it('should return false for validation when not submitted', () => {
    component.isSubmitted = false;
    mockForm.get('team')?.setErrors({ required: true });
    expect(component.shouldValidate()).toBeFalse();
  });
});
