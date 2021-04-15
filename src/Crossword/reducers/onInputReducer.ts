import { CrosswordState } from 'Crossword/crosswordReducer.types';
import deSelectAll from 'Crossword/utils/deSelectAll';
import isValidKey from 'Crossword/utils/isValidKey';
import { moveToNext } from 'Crossword/utils/move';

const onInputReducer = (
  state: CrosswordState,
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const { crossword, direction, currentCell, selection } = state;
  const { cells = [[]], crosswordId } = crossword ?? {};

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
  const entries = cells.map((row) => row.map((cell) => cell && cell.text));
  localStorage.setItem(`kryzz-${crosswordId}`, JSON.stringify(entries));
  return {
    ...state,
    crossword,
    currentCell: nextCell,
  };
};

export default onInputReducer;
