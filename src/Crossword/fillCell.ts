import { CellType } from './Crossword.types';

type Props = {
  cells: CellType[][];
  row: number;
  column: number;
  index: number;
  number: number;
  id: string;
  direction: 'across' | 'down';
  text: string;
  hasTurn?: number[];
};

const fillCell = ({
  cells,
  row,
  column,
  index,
  number,
  id,
  direction,
  text,
  hasTurn,
}: Props) => {
  cells[row][column] = {
    ...cells[row][column],
    text,
    number:
      index === 0 ? number : cells[row][column] && cells[row][column].number,
    row,
    column,
  };

  if (cells[row][column] && cells[row][column][direction]) {
    if (hasTurn && index >= hasTurn[0]) {
      cells[row][column][direction] = [...cells[row][column][direction], id];
    } else {
      cells[row][column][direction] = [id, ...cells[row][column][direction]];
    }
  } else {
    cells[row][column][direction] = [id];
  }
};

export default fillCell;
