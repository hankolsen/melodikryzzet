import { Direction } from 'Crossword/Crossword.types';

// eslint-disable-next-line no-confusing-arrow
const toggleDirection = (direction: Direction) =>
  direction === Direction.across ? Direction.down : Direction.across;

export default toggleDirection;
