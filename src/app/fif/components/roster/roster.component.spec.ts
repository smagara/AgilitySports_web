import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FifService } from '../../services/fif.service';
import { RosterComponent } from './roster.component';

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
  let fifService: FifService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RosterComponent,
        MockPositionDropdownComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        DropdownModule
      ],
      providers: [FifService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    fifService = TestBed.inject(FifService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
