import { CrosswordState } from 'Crossword/crosswordReducer.types';
import cellContainsOtherDirection from 'Crossword/utils/cellContainsOtherDirection';
import getCurrentId from 'Crossword/utils/getCurrentId';
import highlightCurrentSelection from 'Crossword/utils/highlightCurrentSelection';
import toggleDirection from 'Crossword/utils/toggleDirection';

const clickInputReducer = (state: CrosswordState) => {
  const { crossword, selection } = state;
  let { currentCell, direction } = state;
  const { cells = [[]] } = crossword ?? {};
  if (currentCell) {
    if (cellContainsOtherDirection({ currentCell, direction })) {
      direction = toggleDirection(direction);
      const id = getCurrentId({ currentCell, direction, selection });
      highlightCurrentSelection({ cells, currentCell, direction, id });
      return { ...state, selection: id, direction };
    }

    if (currentCell[direction].length > 1) {
      const currentIndex = currentCell[direction].indexOf(selection);
      const nextIndex = (currentIndex + 1) % currentCell[direction].length;
      const newId = currentCell[direction][nextIndex];
      highlightCurrentSelection({
        cells,
        currentCell,
        direction,
        id: newId,
      });
      return {
        ...state,
        selection: newId,
      };
    }
  } else {
    // eslint-disable-next-line prefer-destructuring
    currentCell = cells[0][0];
    if (!currentCell[direction]) {
      direction = toggleDirection(direction);
    }
    const id = getCurrentId({ currentCell, direction, selection });
    highlightCurrentSelection({ cells, currentCell, direction, id });
    return {
      ...state,
      direction,
      selection: id,
      currentCell,
    };
  }
  return state;
};

export default clickInputReducer;
