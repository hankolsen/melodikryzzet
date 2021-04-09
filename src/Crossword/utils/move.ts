import { CellType, Direction } from 'Crossword/Crossword.types';
import highlightId from './highlightId';
import toggleDirection from './toggleDirection';

type Props = {
  direction: Direction;
  cells: CellType[][];
  selection: string;
  currentCell: CellType;
};
type InternalProps = Props & { dir: number };

const move = ({
  direction,
  cells,
  selection,
  currentCell,
  dir,
}: InternalProps) => {
  const array: CellType[] = [];

  cells.map((row) =>
    row.forEach((cell) => {
      if (cell && cell[direction] && cell[direction].includes(selection)) {
        array.push(cell);
      }
    }),
  );

  let nextCell = currentCell;
  const currentIndex = array.findIndex((cell) => cell.selected);
  if (currentIndex + dir > -1 && currentIndex + dir < array.length) {
    const nextIndex = currentIndex + dir;
    nextCell = array[nextIndex];
  }

  return nextCell;
};

const moveToNext = ({ direction, cells, selection, currentCell }: Props) =>
  move({ direction, cells, selection, currentCell, dir: 1 });

const moveToPrevious = ({ direction, cells, selection, currentCell }: Props) =>
  move({ direction, cells, selection, currentCell, dir: -1 });

type MoveToProps = {
  cells: CellType[][];
  direction: Direction;
  selection: string;
  nextCell: CellType;
};
const moveTo = ({ cells, direction, selection, nextCell }: MoveToProps) => {
  if (!nextCell[direction] || !nextCell[direction].includes(selection)) {
    direction = toggleDirection(direction);
    if (!nextCell[direction] || !nextCell[direction].length) {
      direction = toggleDirection(direction);
    }
    [selection] = nextCell[direction];
  }
  highlightId({ cells, direction, id: selection, currentCell: nextCell });
  return { cells, selection, currentCell: nextCell, direction };
};

export { moveToNext, moveToPrevious, moveTo };
