import { CrosswordState } from 'Crossword/crosswordReducer.types';
import deSelectAll from 'Crossword/utils/deSelectAll';
import getArrowKey from 'Crossword/utils/getArrowKey';
import isIgnorableKey from 'Crossword/utils/isIgnorableKey';
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

  const arrow = getArrowKey(key);
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
  if (isIgnorableKey(key)) {
    event.preventDefault();
  }

  return state;
};

export default keyUpReducer;
