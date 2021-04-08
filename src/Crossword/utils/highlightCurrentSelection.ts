import { CellType, Direction } from 'Crossword/Crossword.types';
import deHighlightAll from './deHighlightAll';
import deSelectAll from './deSelectAll';
import highlightSelection from './highLightSelection';

const highlightCurrentSelection = ({
  cells,
  currentCell,
  direction,
  id,
}: {
  cells: CellType[][];
  currentCell: CellType;
  direction: Direction;
  id?: string;
}) => {
  if (id) {
    deHighlightAll(cells);
    deSelectAll(cells);
    currentCell.selected = true;
    highlightSelection(cells, direction, id);
  }
};

export default highlightCurrentSelection;
