import { CellType } from '../Crossword.types';

const deSelectAll = (cells?: CellType[][]) => {
  if (!cells) {
    return;
  }
  cells.forEach((row) =>
    row.forEach((cell) => {
      if (cell) {
        cell.selected = false;
      }
    }),
  );
};

export default deSelectAll;
