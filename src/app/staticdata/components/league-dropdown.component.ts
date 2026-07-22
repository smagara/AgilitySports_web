import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { LeagueOptionDTO } from '../services/league';
import { StaticDataService } from '../services/staticdata.service';

@Component({
  selector: 'app-league-dropdown',
  templateUrl: './league-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeagueDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LeagueDropdownComponent),
      multi: true
    }
  ]
})
export class LeagueDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() sport: string = 'missing';
  leagueCodes: LeagueOptionDTO[] = [];
  value: string = '';
  selectedValue: string = '';
  errorMessage: string = '';

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.loadLeagueCodes();
  }

  loadLeagueCodes(): void {
    this.staticDataService.GetLeagueCodes(this.sport).subscribe(
      (data: LeagueOptionDTO[]) => {
        this.errorMessage = '';
        this.leagueCodes = data || [];
        this.syncDisplayAndModelValue();
      },
      (error) => {
        this.errorMessage = 'Error loading leagues for ' + this.sport;
        console.error('Error fetching league codes for ' + this.sport + ': ', error);
      }
    );
  }

  private normalize(value: any): string {
    return String(value ?? '').trim().toUpperCase();
  }

  private syncDisplayAndModelValue(): void {
    const currentValue = this.normalize(this.value);
    if (!currentValue) {
      this.selectedValue = '';
      return;
    }

    const optionMatch = this.leagueCodes.find(x => this.normalize(x.code) === currentValue);
    if (optionMatch) {
      this.selectedValue = optionMatch.code;
      if (this.value !== optionMatch.code) {
        this.value = optionMatch.code;
        this.onChange(this.value);
      }
      return;
    }

    this.selectedValue = '';
  }

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
    // noop
  }

  onSelectChange(event: any): void {
    this.value = this.normalize(event.target.value);
    this.selectedValue = this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    if (this.errorMessage) {
      return { leagueError: this.errorMessage };
    }

    if (!this.value) {
      return null;
    }

    const valid = this.leagueCodes.some(x => this.normalize(x.code) === this.normalize(this.value));
    return valid ? null : { invalidLeague: true };
  }
}