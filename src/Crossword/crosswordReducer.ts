import { CrosswordAction, CrosswordState } from './crosswordReducer.types';
import clickCellReducer from './reducers/clickCellReducer';
import clickInputReducer from './reducers/clickInputReducer';
import onInputReducer from './reducers/onInputReducer';
import resetReducer from './reducers/resetReducer';
import deSelectAll from './utils/deSelectAll';
import isArrowKey from './utils/isArrowKey';
import isIgnorableKey from './utils/isIgnorableKey';
import { moveToPrevious } from './utils/move';

const crosswordReducer = (
  state: CrosswordState,
  action: CrosswordAction,
): CrosswordState => {
  switch (action.type) {
    case 'reset': {
      return resetReducer(state);
    }
    case 'key_up': {
      const { direction, selection, crossword } = state;
      let { currentCell } = state;
      const { cells = [[]], crosswordId } = crossword ?? {};
      const { event } = action;
      const { key, metaKey } = event;
      if (isIgnorableKey(key) || metaKey) {
        event.preventDefault();
        return state;
      }

      if (isArrowKey(key)) {
        return state;
      }

      if (key === 'Backspace') {
        if (currentCell.text) {
          currentCell.text = '';
        } else {
          currentCell = moveToPrevious({
            currentCell,
            direction,
            cells,
            selection,
          });
        }
      }
      deSelectAll(cells);
      currentCell.selected = true;
      const entries = cells.map((row) => row.map((cell) => cell && cell.text));
      localStorage.setItem(`kryzz-${crosswordId}`, JSON.stringify(entries));

      return { ...state, currentCell };
    }
    case 'on_input':
      return onInputReducer(state, action.event);
    case 'click_input':
      return clickInputReducer(state);
    case 'click_cell':
      return clickCellReducer(state, action.row, action.column);
    case 'load':
      return { ...state, isLoading: true };
    case 'crossword_loaded':
      return {
        ...state,
        isLoading: false,
        crossword: action.crossword,
      };
    case 'crossword_load_failed':
      return {
        ...state,
        isLoading: false,
        crossword: undefined,
      };
    default:
      return state;
  }
};

export default crosswordReducer;
