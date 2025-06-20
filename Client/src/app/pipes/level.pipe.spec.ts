import { LevelPipe } from './level.pipe';

describe('LevelPipe', () => {
  let pipe: LevelPipe;

  beforeEach(() => {
    pipe = new LevelPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "Level1" to "Level 1"', () => {
    expect(pipe.transform('Level1')).toBe('Level 1');
  });

  it('should transform "Level2" to "Level 2"', () => {
    expect(pipe.transform('Level2')).toBe('Level 2');
  });

  it('should transform "Level3" to "Level 3"', () => {
    expect(pipe.transform('Level3')).toBe('Level 3');
  });

  it('should return the original value if not matching any case', () => {
    expect(pipe.transform('Unknown')).toBe('Unknown');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('SomeOtherValue')).toBe('SomeOtherValue');
  });
});
