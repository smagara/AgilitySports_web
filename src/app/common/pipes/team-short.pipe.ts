import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamShort'
})
export class TeamShortPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const teamName = String(value || '').trim();
    if (!teamName) {
      return '';
    }

    const tokens = teamName
      .replace(/[^A-Za-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);

    if (tokens.length === 0) {
      return '';
    }

    if (tokens.length === 1) {
      return tokens[0].slice(0, 3).toUpperCase();
    }

    const compact = tokens.map(token => token[0]).join('').toUpperCase();
    return compact.length <= 4 ? compact : compact.slice(0, 4);
  }
}
