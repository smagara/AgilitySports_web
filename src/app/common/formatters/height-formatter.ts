// Usage: import { inchesToFeetInches, feetInchesToInches } from './height-formatter';

export function inchesToFeetInches(height: string | number | null | undefined): string {
  const raw = String(height ?? '').trim();
  if (!raw) {
    return '';
  }

  // Already in feet/inches format (e.g. 5'11"), return as-is.
  if (raw.includes("'")) {
    return raw;
  }

  if (!/^\d+$/.test(raw)) {
    return raw;
  }

  const totalInches = Number(raw);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
}

export function feetInchesToInches(height: string | number | null | undefined): string {
  const raw = String(height ?? '').trim();
  if (!raw) {
    return '';
  }

  // Already stored as inches.
  if (/^\d+$/.test(raw)) {
    return raw;
  }

  // Accept 5'11", 5'11, and optional whitespace variants.
  const match = raw.match(/^(\d+)\s*'\s*(\d{1,2})\s*"?$/);
  if (!match) {
    return raw;
  }

  const feet = Number(match[1]);
  const inches = Number(match[2]);
  return String((feet * 12) + inches);
}
