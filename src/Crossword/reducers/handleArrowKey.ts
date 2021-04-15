import { CellType } from 'Crossword/Crossword.types';
import { CrosswordState } from 'Crossword/crosswordReducer.types';
import { moveTo } from 'Crossword/utils/move';

type Props = {
  state: CrosswordState;
  arrow: string;
};
const handleArrowKey = ({ state, arrow }: Props) => {
  const { crossword, currentCell, selection, direction } = state;
  const { cells = [[]] } = crossword ?? {};
  const { row, column } = currentCell ?? {};

  const moves: {
    [arrow: string]: (
      cells: CellType[][],
      row: number,
      column: number,
    ) => CellType;
  } = {
    Left: (cells: CellType[][], row: number, column: number) =>
      cells[row][column - 1],
    Right: (cells: CellType[][], row: number, column: number) =>
      cells[row][column + 1],
    Up: (cells: CellType[][], row: number, column: number) =>
      cells[row - 1] && cells[row - 1][column],
    Down: (cells: CellType[][], row: number, column: number) =>
      cells[row + 1] && cells[row + 1][column],
  };

  if (!moves[arrow]) {
    return state;
  }

  const newCell: CellType = moves[arrow](cells, row, column);

  if (newCell) {
    return moveTo({ nextCell: newCell, cells, selection, direction });
  }

  return state;
};

export default handleArrowKey;
