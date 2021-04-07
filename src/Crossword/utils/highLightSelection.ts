import { CellType, Direction } from 'Crossword/Crossword.types';

const highlightSelection = (cells: CellType[][], direction: Direction, id: string) => {
  cells.map((row) =>
    row.forEach((cell) => {
      if (cell && cell[direction] && cell[direction].includes(id)) {
        cell.highlighted = true;
      }
    }),
  );
};

export default highlightSelection;
