import { ToZeroPipe } from './to-zero.pipe';

describe('ToZeroPipe', () => {
  let pipe: ToZeroPipe;

  beforeEach(() => {
    pipe = new ToZeroPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "0.0%" to "0%"', () => {
    expect(pipe.transform('0.0%')).toBe('0%');
  });

  it('should trim spaces and still transform " 0.0% " to "0%"', () => {
    expect(pipe.transform(' 0.0% ')).toBe('0%');
  });

  it('should return the same value if not "0.0%"', () => {
    expect(pipe.transform('10.5%')).toBe('10.5%');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe(null);
  });
});
