import { CellType, Direction } from 'Crossword/Crossword.types';

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
  if (currentIndex > -1 && currentIndex < array.length) {
    const nextIndex = currentIndex + dir;
    nextCell = array[nextIndex];
  }

  return nextCell;
};

const moveToNext = ({ direction, cells, selection, currentCell }: Props) =>
  move({ direction, cells, selection, currentCell, dir: 1 });

const moveToPrevious = ({ direction, cells, selection, currentCell }: Props) =>
  move({ direction, cells, selection, currentCell, dir: -1 });

export { moveToNext, moveToPrevious };
