import { feetInchesToInches, inchesToFeetInches } from './height-formatter';

describe('height-formatter', () => {
  it('should format inches into feet/inches string', () => {
    expect(inchesToFeetInches('71')).toBe("5'11\"");
    expect(inchesToFeetInches(84)).toBe("7'0\"");
  });

  it('should keep feet/inches strings unchanged', () => {
    expect(inchesToFeetInches("6'2\"")).toBe("6'2\"");
  });

  it('should convert feet/inches into inches for persistence', () => {
    expect(feetInchesToInches("5'11\"")).toBe('71');
    expect(feetInchesToInches("6'2")).toBe('74');
  });

  it('should keep numeric inches unchanged', () => {
    expect(feetInchesToInches('70')).toBe('70');
  });
});
