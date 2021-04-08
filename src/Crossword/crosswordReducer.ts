import { CrosswordAction, CrosswordState } from './crosswordReducer.types';
import clickCellReducer from './reducers/clickCellReducer';
import clickInputReducer from './reducers/clickInputReducer';
import onInputReducer from './reducers/onInputReducer';
import resetReducer from './reducers/resetReducer';
import isArrowKey from './utils/isArrowKey';
import isIgnorableKey from './utils/isIgnorableKey';

const crosswordReducer = (
  state: CrosswordState,
  action: CrosswordAction,
): CrosswordState => {
  switch (action.type) {
    case 'reset': {
      return resetReducer(state);
    }
    case 'key_up': {
      const { event } = action;
      const { key, metaKey } = event;
      if (isIgnorableKey(key) || metaKey) {
        event.preventDefault();
        return state;
      }

      if (isArrowKey(key)) {
        return state;
      }

      return state;
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
        ...action.crossword,
      };
    case 'crossword_load_failed':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default crosswordReducer;
