import { CellType, Direction } from 'Crossword/Crossword.types';
import cellIsStartingWord from './cellIsStartingWord';

type Props = {
  cell: CellType;
  direction: Direction;
};
const cellIsStartingWordInOtherDirection = ({ cell, direction }: Props) => {
  const otherDirection =
    direction === Direction.across ? Direction.down : Direction.across;
  return cellIsStartingWord({ cell, direction: otherDirection });
};

export default cellIsStartingWordInOtherDirection;
