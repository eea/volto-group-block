import { countCharsWithoutSpaces, countCharsWithSpaces } from './utils';

describe('countCharsWithoutSpaces', () => {
  it('should return number of charts without spaces', () => {
    const paragraph = 'Lorem ipsum dolor sit';
    expect(countCharsWithoutSpaces(paragraph)).toBe(18);
  });
});

describe('countCharsWithSpaces', () => {
  it('should return number of charts with spaces', () => {
    const paragraph = 'Lorem ipsum dolor sit';
    expect(countCharsWithSpaces(paragraph)).toBe(21);
  });
});
