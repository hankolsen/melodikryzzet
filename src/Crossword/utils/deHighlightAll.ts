import { CellType } from '../Crossword.types';

const deHighlightAll = (cells?: CellType[][]) => {
  if (!cells) {
    return;
  }
  cells.forEach((row) =>
    row.forEach((cell) => {
      if (cell) {
        cell.selected = false;
        cell.highlighted = false;
      }
    }),
  );
};

export default deHighlightAll;
