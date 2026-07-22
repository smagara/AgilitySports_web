import { TeamShortPipe } from './team-short.pipe';

describe('TeamShortPipe', () => {
  const pipe = new TeamShortPipe();

  it('should return first three letters for single-word team names', () => {
    expect(pipe.transform('Athletics')).toBe('ATH');
  });

  it('should return initials for multi-word team names', () => {
    expect(pipe.transform('New York Yankees')).toBe('NYY');
    expect(pipe.transform('Los Angeles Dodgers')).toBe('LAD');
  });
});
