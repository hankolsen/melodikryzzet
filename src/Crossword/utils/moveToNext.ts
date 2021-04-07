import { CellType, Direction } from 'Crossword/Crossword.types';

type Props = { direction: Direction; cells: CellType[][]; selection: string, currentCell: CellType };
const moveToNext = ({ direction, cells, selection, currentCell }: Props) => {
  const dir = 1;
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

export default moveToNext;
