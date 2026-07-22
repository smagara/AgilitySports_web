import { Pipe, PipeTransform } from '@angular/core';
import { inchesToFeetInches } from '../formatters/height-formatter';

@Pipe({
  name: 'heightDisplay'
})
export class HeightPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    return inchesToFeetInches(value);
  }
}
