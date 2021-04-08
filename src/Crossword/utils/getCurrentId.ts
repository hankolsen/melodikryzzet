import { CellType, Direction } from '../Crossword.types';

type Props = {
  currentCell: CellType;
  direction: Direction;
  selection?: string;
};

const getCurrentId = ({ currentCell, direction, selection }: Props) => {
  let id;
  if (
    selection &&
    currentCell &&
    currentCell[direction] &&
    currentCell[direction].includes(selection)
  ) {
    id = selection;
  } else {
    id = currentCell[direction] && currentCell[direction][0];
  }
  /* if (!id) {
    direction = toggleDirection(direction);
    [id] = currentCell[direction];
  } */
  return id;
};

export default getCurrentId;
