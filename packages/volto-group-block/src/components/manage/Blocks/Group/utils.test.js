import {
  countCharsWithoutSpaces,
  countCharsWithSpaces,
  fillEmptyGroup,
} from './utils';

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

describe('fillEmptyGroup', () => {
  it('fills an emptied group and keeps its other fields', () => {
    const result = fillEmptyGroup({
      blocks: {},
      blocks_layout: { items: [] },
      extra: 'kept',
    });
    expect(result.extra).toBe('kept');
    expect(result.blocks_layout.items).toHaveLength(1);
    expect(Object.keys(result.blocks)).toEqual(result.blocks_layout.items);
  });

  it('returns a group with blocks unchanged', () => {
    const childData = { blocks: { a: {} }, blocks_layout: { items: ['a'] } };
    expect(fillEmptyGroup(childData)).toBe(childData);
  });
});
