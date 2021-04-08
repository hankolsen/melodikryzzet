import { CrosswordState } from 'Crossword/crosswordReducer.types';
import cellContainsOtherDirection from 'Crossword/utils/cellContainsOtherDirection';
import cellIsStartingWord from 'Crossword/utils/cellIsStartingWord';
import cellIsStartingWordInOtherDirection from 'Crossword/utils/cellIsStartingWordInOtherDirection';
import getCurrentId from 'Crossword/utils/getCurrentId';
import highlightCurrentSelection from 'Crossword/utils/highlightCurrentSelection';
import toggleDirection from 'Crossword/utils/toggleDirection';

const clickCellReducer = (
  state: CrosswordState,
  row: number,
  column: number,
) => {
  const { crossword } = state;
  let { direction } = state;
  const { cells = [[]] } = crossword ?? {};
  const currentCell = cells[row][column];

  if (
    currentCell.number &&
    !currentCell.highlighted &&
    !cellIsStartingWord({ cell: currentCell, direction }) &&
    cellContainsOtherDirection({ currentCell, direction }) &&
    cellIsStartingWordInOtherDirection({
      cell: currentCell,
      direction,
    })
  ) {
    direction = toggleDirection(direction);
  }

  if (!currentCell[direction] || currentCell.selected) {
    direction = toggleDirection(direction);
  }

  const id = getCurrentId({
    currentCell,
    direction,
    selection: state.selection,
  });

  highlightCurrentSelection({ cells, currentCell, direction, id });

  return {
    ...state,
    selection: id,
    direction,
    showInput: true,
    currentCell,
    crossword,
  };
};

export default clickCellReducer;
