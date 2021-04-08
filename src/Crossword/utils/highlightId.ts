import { CellType, Direction } from 'Crossword/Crossword.types';
import deHighlightAll from './deHighlightAll';
import deSelectAll from './deSelectAll';

type Props = {
  cells: CellType[][];
  direction: Direction;
  id: string;
  currentCell: CellType;
};
const highlightId = ({ cells, direction, id, currentCell }: Props) => {
  deSelectAll(cells);
  deHighlightAll(cells);
  currentCell.selected = true;

  cells.map((row) =>
    row.forEach((cell) => {
      if (cell && cell[direction] && cell[direction].includes(id)) {
        cell.highlighted = true;
      }
    }),
  );
};

export default highlightId;
