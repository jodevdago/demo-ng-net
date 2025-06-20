import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if value is null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return an empty string if value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return an empty string if value is an empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return initials for a single word', () => {
    expect(pipe.transform('Jonathan')).toBe('J');
  });

  it('should return initials for two words', () => {
    expect(pipe.transform('Jonathan Rabefialy')).toBe('JR');
  });

  it('should ignore extra spaces between words', () => {
    expect(pipe.transform('  Jonathan   Rabefialy  ')).toBe('JR');
  });

  it('should return uppercase initials', () => {
    expect(pipe.transform('john doe')).toBe('JD');
  });

  it('should return correct initials for multiple words', () => {
    expect(pipe.transform('Alice Bob Charles')).toBe('ABC');
  });

  it('should return correct initials when words contain special characters', () => {
    expect(pipe.transform('anne-marie o\'neill')).toBe('AO');
  });
});
