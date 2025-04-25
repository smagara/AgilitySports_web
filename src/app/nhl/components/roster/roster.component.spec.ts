import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { NhlService } from '../../services/nhl.service';
import { RosterDetailComponent } from '../roster-detail/roster-detail.component';
import { RosterListComponent } from '../roster-list/roster-list.component';
import { RosterComponent } from './roster.component';

// Mock PositionDropdownComponent
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
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;
  let nhlService: NhlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RosterComponent,
        RosterListComponent,
        RosterDetailComponent,
        MockPositionDropdownComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [NhlService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    nhlService = TestBed.inject(NhlService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
