import { isValidKey } from 'Crossword/crosswordHelper';
import { CrosswordState } from 'Crossword/crosswordReducer.types';
import deSelectAll from 'Crossword/utils/deSelectAll';
import { moveToNext } from 'Crossword/utils/move';

const onInputReducer = (
  state: CrosswordState,
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const { crossword, direction, currentCell, selection } = state;
  const { cells = [[]] } = crossword ?? {};

  const { value } = event.target as HTMLInputElement;
  if (!isValidKey(value)) {
    return state;
  }

  currentCell.text = value.toUpperCase();
  const nextCell = moveToNext({
    cells,
    direction,
    selection,
    currentCell,
  });
  deSelectAll(cells);
  nextCell.selected = true;
  return {
    ...state,
    crossword,
    currentCell: nextCell,
  };
};

export default onInputReducer;
