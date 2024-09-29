import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nonEmptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value && value.trim() !== '' ? null : { nonEmptyString: true };
  };
}