import { CellType, Direction } from 'Crossword/Crossword.types';
import { moveToPrevious } from 'Crossword/utils/move';

type Props = {
  currentCell: CellType;
  direction: Direction;
  cells: CellType[][];
  selection: string;
};

const handleBackspaceKey = ({
  currentCell,
  cells,
  direction,
  selection,
}: Props) => {
  if (currentCell.text) {
    currentCell.text = '';
  } else {
    currentCell = moveToPrevious({
      currentCell,
      direction,
      cells,
      selection,
    });
  }

  return currentCell;
};

export default handleBackspaceKey;
