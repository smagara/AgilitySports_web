import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { TeamOptionDTO } from '../services/league';
import { StaticDataService } from '../services/staticdata.service';

@Component({
  selector: 'app-team-dropdown',
  templateUrl: './team-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeamDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TeamDropdownComponent),
      multi: true
    }
  ]
})
export class TeamDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() sport: string = 'missing';

  teamCodes: TeamOptionDTO[] = [];
  value: string = '';
  selectedValue: string = '';
  errorMessage: string = '';
  isDisabled: boolean = false;

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.loadTeamCodes();
  }

  loadTeamCodes(): void {
    this.staticDataService.GetTeamCodes(this.sport).subscribe(
      (data: TeamOptionDTO[]) => {
        if (data.length === 0) {
          this.errorMessage = 'No teams found for ' + this.sport;
          this.teamCodes = [];
          return;
        }

        this.errorMessage = '';
        this.teamCodes = data;
        this.syncDisplayAndModelValue();
      },
      (error) => {
        this.errorMessage = 'Error loading teams for ' + this.sport;
        console.error('Error fetching team codes for ' + this.sport + ': ', error);
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

    const match = this.teamCodes.find(t => this.normalize(t.code) === currentValue);
    if (match) {
      this.selectedValue = match.code;
      if (this.value !== match.code) {
        this.value = match.code;
        this.onChange(this.value);
      }
      return;
    }

    // Also support incoming values that are short team labels (e.g., "Ducks").
    const matchByLabel = this.teamCodes.find(t => this.normalize(t.label) === currentValue);
    if (matchByLabel) {
      this.selectedValue = matchByLabel.code;
      this.value = matchByLabel.code;
      this.onChange(this.value);
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
    this.isDisabled = isDisabled;
  }

  onSelectChange(event: any): void {
    this.value = this.normalize(event.target.value);
    this.selectedValue = this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    if (this.errorMessage) {
      return { teamError: this.errorMessage };
    }

    if (!this.value) {
      return null;
    }

    const valid = this.teamCodes.some(x => this.normalize(x.code) === this.normalize(this.value));
    return valid ? null : { invalidTeam: true };
  }
}
