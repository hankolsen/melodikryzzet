import { CrosswordState } from 'Crossword/crosswordReducer.types';
import emptyAll from 'Crossword/utils/emptyAll';

const resetReducer = (state: CrosswordState) => {
  const { crossword } = state;
  const { cells = [[]], crosswordId } = crossword ?? {};
  if (crosswordId !== undefined) {
    localStorage.removeItem(`kryzz-${crosswordId}`);
  }
  emptyAll(cells);
  return { ...state, crossword };
};

export default resetReducer;
