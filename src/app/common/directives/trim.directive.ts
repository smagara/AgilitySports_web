import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTrim]'
})
export class TrimDirective {
    constructor(private el: ElementRef) { console.log('TrimDirective created!'); }

    ngOnInit() {
      console.log('TrimDirective ngOnInit');
    }

    @HostListener('blur')
    onBlur() {
        setTimeout(() => {
            const value: string = this.el.nativeElement.value;
            this.el.nativeElement.value = value.trim();
            console.log('Trimmed value: ', '|' + this.el.nativeElement.value + '|');
        });
    }
}
