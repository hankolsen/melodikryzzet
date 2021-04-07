import { Direction } from 'Crossword/Crossword.types';
import toggleDirection from './toggleDirection';

describe('toggleDirection test', () => {
  it('should toggle the direction', () => {
    expect(toggleDirection(Direction.across)).toBe(Direction.down);
    expect(toggleDirection(Direction.down)).toBe(Direction.across);
  });
});
