import { CellType } from 'Crossword/Crossword.types';

const emptyAll = (cells: CellType[][]) => {
  cells.map((row) =>
    row.forEach((column) => {
      if (column) {
        column.text = '';
      }
    }),
  );
};

export default emptyAll;
