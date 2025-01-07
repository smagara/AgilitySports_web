import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[appTrim]',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TrimDirective),
        multi: true
      }
    ]
  })
  // Turns out we also need to make the form control aware of the trim() or we see padding on next visit to the record
  export class TrimDirective implements ControlValueAccessor {
    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};
  
    constructor(private el: ElementRef) {
      console.log('TrimDirective created!');
    }
  
    ngOnInit() {
      console.log('TrimDirective ngOnInit');
    }
  
    @HostListener('blur')
    onBlur() {
      setTimeout(() => {
        const value: string = this.el.nativeElement.value.trim();
        this.el.nativeElement.value = value;
        this.onChange(value);
        console.log('Trimmed value: ', '|' + value + '|');
      });
    }
  
    writeValue(value: string): void {
      this.el.nativeElement.value = value;
    }
  
    registerOnChange(fn: (value: string) => void): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
  
    setDisabledState?(isDisabled: boolean): void {
      this.el.nativeElement.disabled = isDisabled;
    }
  }