import { CellType, Direction } from 'Crossword/Crossword.types';

type Props = {
  cell: CellType;
  direction: Direction;
};

const cellIsStartingWord = ({ cell, direction }: Props) =>
  Boolean(
    cell &&
      cell.number &&
      cell[direction] &&
      cell[direction].find((id) => id.startsWith(cell.number!.toString())),
  );

export default cellIsStartingWord;
