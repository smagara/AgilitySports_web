import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noXssValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    // Block any < or > character to prevent all HTML tags, including <script> in freeform text input
    if (value && /[<>]/.test(value)) {
      return { xss: true };
    }
    return null;
  };
}