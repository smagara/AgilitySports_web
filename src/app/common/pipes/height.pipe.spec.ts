import { HeightPipe } from './height.pipe';

describe('HeightPipe', () => {
  const pipe = new HeightPipe();

  it('should convert inches to feet/inches', () => {
    expect(pipe.transform('71')).toBe("5'11\"");
  });

  it('should preserve formatted values', () => {
    expect(pipe.transform("6'2\"")).toBe("6'2\"");
  });
});
