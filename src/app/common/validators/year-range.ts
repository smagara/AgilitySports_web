import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function to validate year range
export function yearRangeValidator(minYear: number, maxYear: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && (value < minYear || value > maxYear)) {
      return { 'yearRange': { min: minYear, max: maxYear } };
    }
    return null;
  };
}
