import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-handedness-dropdown',
  templateUrl: './handedness-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HandednessDropdownComponent),
      multi: true
    }
  ]
})
export class HandednessDropdownComponent implements ControlValueAccessor {
  @Input() includeBoth: boolean = true;

  value: string = '';
  isDisabled: boolean = false;

  get options(): Array<{ code: string; label: string }> {
    const base = [
      { code: 'L', label: 'Left' },
      { code: 'R', label: 'Right' }
    ];

    return this.includeBoth ? [...base, { code: 'B', label: 'Both' }] : base;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  private normalizeToCode(value: any): string {
    const normalized = String(value ?? '').trim().toUpperCase();
    if (!normalized) {
      return '';
    }

    if (/^L(\b|[^A-Z]|EFT)/.test(normalized)) {
      return 'L';
    }

    if (/^R(\b|[^A-Z]|IGHT)/.test(normalized)) {
      return 'R';
    }

    if (this.includeBoth && (/^B(\b|[^A-Z]|OTH)/.test(normalized) || /^S(\b|[^A-Z]|WITCH)/.test(normalized))) {
      return 'B';
    }

    return '';
  }

  writeValue(value: any): void {
    this.value = this.normalizeToCode(value);
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
    this.value = this.normalizeToCode(event?.target?.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
