import { CellType, Direction } from 'Crossword/Crossword.types';

type Props = {
  currentCell: CellType;
  direction: Direction;
};

const cellContainsOtherDirection = ({ currentCell, direction }: Props) =>
  Boolean(
    (direction === Direction.across && currentCell.down?.length) ||
      (direction === Direction.down && currentCell.across?.length),
  );

export default cellContainsOtherDirection;
