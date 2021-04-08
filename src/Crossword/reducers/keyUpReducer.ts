import { isIgnorableKey } from 'Crossword/crosswordHelper';
import { CrosswordState } from 'Crossword/crosswordReducer.types';
import deSelectAll from 'Crossword/utils/deSelectAll';
import isArrowKey from 'Crossword/utils/isArrowKey';
import handleArrowKey from './handleArrowKey';
import handleBackspaceKey from './handleBackspaceKey';

const keyUpReducer = (
  state: CrosswordState,
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const { direction, selection, crossword } = state;
  let { currentCell } = state;
  const { cells = [[]], crosswordId } = crossword ?? {};
  const { key, metaKey } = event;

  if (key === 'Shift' || metaKey) {
    return state;
  }

  const arrow = isArrowKey(key);
  let newState;
  if (arrow) {
    newState = handleArrowKey({ state, arrow });
    return { ...state, ...newState };
  }

  if (key === 'Backspace') {
    currentCell = handleBackspaceKey({
      currentCell,
      direction,
      cells,
      selection,
    });
    deSelectAll(cells);
    currentCell.selected = true;
    const entries = cells.map((row) => row.map((cell) => cell && cell.text));
    localStorage.setItem(`kryzz-${crosswordId}`, JSON.stringify(entries));
    return { ...state, currentCell };
  }
  if (isIgnorableKey(key) || metaKey) {
    event.preventDefault();
  }
  const entries = cells.map((row) => row.map((cell) => cell && cell.text));
  localStorage.setItem(`kryzz-${crosswordId}`, JSON.stringify(entries));

  return state;
};

export default keyUpReducer;
