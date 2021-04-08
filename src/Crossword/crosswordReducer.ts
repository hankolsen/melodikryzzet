import { CrosswordAction, CrosswordState } from './crosswordReducer.types';
import clickCellReducer from './reducers/clickCellReducer';
import clickInputReducer from './reducers/clickInputReducer';
import keyUpReducer from './reducers/keyUpReducer';
import onInputReducer from './reducers/onInputReducer';
import resetReducer from './reducers/resetReducer';

const crosswordReducer = (
  state: CrosswordState,
  action: CrosswordAction,
): CrosswordState => {
  switch (action.type) {
    case 'reset':
      return resetReducer(state);
    case 'key_up':
      return keyUpReducer(state, action.event);
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
