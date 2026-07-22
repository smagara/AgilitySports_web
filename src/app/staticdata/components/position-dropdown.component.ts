// Reusable component for a dropdown list of position codes for a given sport.  Supply the sport parameter to filter the PositionCodes table.
// Sample usage <app-position-dropdown id="position" [sport]="'nhl'" formControlName="position" />

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { PositionCodesDTO } from '../services/positioncodes';
import { StaticDataService } from '../services/staticdata.service';

@Component({
  selector: 'app-position-dropdown',
  templateUrl: './position-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PositionDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PositionDropdownComponent),
      multi: true
    }
  ]
})
export class PositionDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() sport: string = 'missing';
  positionCodes: PositionCodesDTO[] = [];
  value: string = '';
  selectedValue: string = '';
  errorMessage: string = '';

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.loadPositionCodes();
  }

  loadPositionCodes(): void {
    this.staticDataService.GetPositionCodes(this.sport).subscribe(
      (data: PositionCodesDTO[]) => {

        if (data.length === 0) {
          this.errorMessage = 'No position codes found for ' + this.sport;
          this.positionCodes = [];
          return;
        }

        this.errorMessage = '';
        this.positionCodes = data;
        this.syncDisplayAndModelValue();
      },
      (error) => {
        console.error('Error fetching position codes for ' + this.sport + ": ", error);
      }
    );
  }

  private normalize(value: any): string {
    return String(value ?? '').trim();
  }

  private syncDisplayAndModelValue(): void {
    const currentValue = this.normalize(this.value);

    if (!currentValue) {
      this.selectedValue = '';
      return;
    }

    const matchByCode = this.positionCodes.find(p =>
      this.normalize(p.positionCode).toLowerCase() === currentValue.toLowerCase()
    );

    if (matchByCode) {
      this.selectedValue = matchByCode.positionCode;
      return;
    }

    const matchByDescription = this.positionCodes.find(p =>
      this.normalize(p.positionDesc).toLowerCase() === currentValue.toLowerCase()
    );

    if (matchByDescription) {
      this.selectedValue = matchByDescription.positionCode;
      this.value = matchByDescription.positionCode;
      this.onChange(this.value);
      return;
    }

    this.selectedValue = '';
  }

  // Implement ControlValueAccessor
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = this.normalize(value);
    this.syncDisplayAndModelValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }

  onSelectChange(event: any): void {
    this.value = event.target.value;
    this.selectedValue = this.value;
    this.onChange(this.value);
    this.onTouched();
  }
  
  // Implement Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.errorMessage) {
      return { positionError: this.errorMessage };
    }
    return null;
  }

}